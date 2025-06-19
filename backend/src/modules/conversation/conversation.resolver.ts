import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './models/conversation.model';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Query(() => [Conversation])
  async getConversations(): Promise<Conversation[]> {
    return this.conversationService.getConversations() as Promise<Conversation[]>;
  }

  @Query(() => Conversation, { nullable: true })
  async getConversation(@Args('id', { type: () => Int }) id: number): Promise<Conversation | null> {
    return this.conversationService.getConversationById(id) as Promise<Conversation | null>;
  }

  @Query(() => [Conversation])
  async getConversationsByUser(@Args('userId', { type: () => Int }) userId: number): Promise<Conversation[]> {
    return this.conversationService.getConversationsByUser(userId) as Promise<Conversation[]>;
  }

  @Mutation(() => Conversation)
  async createConversation(@Args('inputs') inputs: CreateConversationDto): Promise<Conversation> {
    // Créer la conversation
    const conversation = await this.conversationService.createConversation({
      name: inputs.name,
    });

    // Ajouter les participants
    for (const participantId of inputs.participantIds) {
      await this.conversationService.addParticipantToConversation(conversation.id, participantId);
    }

    // Publier un message dans RabbitMQ pour notifier les participants
    await this.rabbitMQService.publishMessage('conversation.created', {
      conversationId: conversation.id,
      participantIds: inputs.participantIds,
      type: 'CONVERSATION_CREATED',
    });

    const result = await this.conversationService.getConversationById(conversation.id);
    if (!result) {
      throw new Error('Conversation not found after creation');
    }
    return result as Conversation;
  }

  @Mutation(() => Conversation)
  async addParticipantToConversation(
    @Args('conversationId', { type: () => Int }) conversationId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Conversation> {
    await this.conversationService.addParticipantToConversation(conversationId, userId);

    // Publier un message dans RabbitMQ
    await this.rabbitMQService.publishMessage('conversation.participant.added', {
      conversationId,
      userId,
      type: 'PARTICIPANT_ADDED',
    });

    const result = await this.conversationService.getConversationById(conversationId);
    if (!result) {
      throw new Error('Conversation not found');
    }
    return result as Conversation;
  }
} 