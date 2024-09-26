import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweet Tests', () => {
  describe('Tweet Class', () => {
    it('should create a tweet', () => {
      const tweet = new Tweet({
        content: 'Hello World',
        screen_name: 'Abner Ugeda',
      });

      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('Abner Ugeda');
    });
  });

  describe('Using MongoDB', () => {
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      conn = await mongoose.connect(
        'mongodb://root:root@localhost:27017/tweets_test?authSource=admin',
      );
    });

    afterEach(async () => {
      await conn.disconnect();
    });

    it('Create a tweet document', async () => {
      const TweetModel = conn.model('Tweet', TweetSchema);
      const tweet = new TweetModel({
        content: 'Hello world',
        screen_name: 'Abner Ugeda',
      });

      await tweet.save();

      const tweetCreated = await TweetModel.findById(tweet._id);
      expect(tweetCreated.content).toBe('Hello world');
      expect(tweetCreated.screen_name).toBe('Abner Ugeda');
    });
  });
});
