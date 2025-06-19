import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './models/message.model';
import { SendMessageDto } from './dto/send-message.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { PubSub } from 'graphql-subscriptions';
import { OnModuleInit } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver implements OnModuleInit {
  constructor(
    private readonly messageService: MessageService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async onModuleInit() {
    // Consommer les messages RabbitMQ et publier sur le PubSub
    this.rabbitMQService.consumeMessages('messages', async (msg) => {
      if (msg.type === 'MESSAGE_SENT') {
        // Refetch le message complet depuis la base pour avoir les bons types
        const fullMessage = await this.messageService.getMessageById(msg.id);
        if (fullMessage) {
          pubSub.publish('messageSent', { messageSent: {
            ...fullMessage,
            user: {
              id: fullMessage.user.id,
              email: fullMessage.user.email,
              firstName: fullMessage.user.firstName,
              lastName: fullMessage.user.lastName,
            }
          }});
        }
      }
    });
  }

  @Query(() => [Message])
  async getMessagesByConversation(
    @Args('conversationId', { type: () => Int }) conversationId: number,
  ): Promise<Message[]> {
    return this.messageService.getMessagesByConversation(conversationId) as unknown as Message[];
  }

  @Mutation(() => Message)
  async sendMessage(@Args('inputs') inputs: SendMessageDto): Promise<Message> {
    // Enregistrer le message en base
    const message = await this.messageService.sendMessage({
      content: inputs.content,
      user: { connect: { id: inputs.userId } },
      conversation: { connect: { id: inputs.conversationId } },
    });

    // Publier le message dans RabbitMQ pour le temps réel
    await this.rabbitMQService.publishMessage('messages', {
      ...message,
      type: 'MESSAGE_SENT',
    });

    return message as unknown as Message;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageSent.conversationId === variables.conversationId,
    resolve: (payload) => payload.messageSent,
  })
  messageSent(@Args('conversationId', { type: () => Int }) conversationId: number) {
    return pubSub.asyncIterator('messageSent');
  }
} 