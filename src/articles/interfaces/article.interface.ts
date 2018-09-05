export interface Article {
  readonly title: string;
  readonly text: string;
  readonly image: string;
  readonly userId: string;
  readonly comments: string[];
  readonly votes: number;
  readonly published?: boolean;
  readonly approved?: boolean;
}
