import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './entities/tweet.entity';

describe('TweetsController', () => {
  let service: TweetsService;
  let module: TestingModule;
  beforeEach(async () => {
    const uri =
      'mongodb://root:root@localhost:27017/tweets_test?authSource=admin';

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      controllers: [TweetsController],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'Esse é o tweet mais bonito',
      screen_name: 'Abner Ugeda',
    });

    expect(tweet.content).toBe('Esse é o tweet mais bonito');
    expect(tweet.screen_name).toBe('Abner Ugeda');
  });
});
