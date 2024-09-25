export type TweetProps = {
  content: string;
  screen_name: string;
};

export class Tweet {
  constructor(props: TweetProps) {
    Object.assign(this, props);
  }

  content: string;

  screen_name: string;
}
