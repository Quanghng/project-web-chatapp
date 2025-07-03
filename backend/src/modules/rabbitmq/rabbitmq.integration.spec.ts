import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQModule } from './rabbitmq.module';
import { RabbitMQService } from './rabbitmq.service';
import { ConfigModule } from '@nestjs/config';

describe('RabbitMQService (integration)', () => {
  let rabbitMQService: RabbitMQService;
  const testQueue = 'testQueue';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RabbitMQModule,
      ],
    }).compile();

    rabbitMQService = moduleFixture.get<RabbitMQService>(RabbitMQService);
    await rabbitMQService.onModuleInit();
    await rabbitMQService['channel'].assertQueue(testQueue, { durable: true });
    await rabbitMQService['channel'].purgeQueue(testQueue);
  });

  afterAll(async () => {
    await rabbitMQService.onModuleDestroy();
  });

  it('should connect to RabbitMQ and create channel', () => {
    expect(rabbitMQService['connection']).toBeDefined();
    expect(rabbitMQService['channel']).toBeDefined();
  });

  it('should publish a message to a queue', async () => {
    const result = await rabbitMQService.publishMessage(testQueue, { text: 'hello' });
    expect(result).toBeTruthy();
  });

  it('should consume message from a queue', (done) => {
    const testMessage = { text: 'consume test' };
    let doneCalled = false;

    rabbitMQService.publishMessage(testQueue, testMessage).then(() => {
      rabbitMQService.consumeMessages(testQueue, (msg) => {
        try {
          if (!doneCalled && JSON.stringify(msg) === JSON.stringify(testMessage)) {
            doneCalled = true;
            expect(msg).toEqual(testMessage);
            done();
          }
        } catch (error) {
          done(error);
        }
      });
    }).catch(done);
  });
});
