import { Tweet } from './tweet.entity';

describe('Tweet Tests', () => {
  it('should create a tweet', () => {
    const tweet = new Tweet({
      content: 'Hello World',
      screen_name: 'Abner Ugeda',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Abner Ugeda');
  });
});
