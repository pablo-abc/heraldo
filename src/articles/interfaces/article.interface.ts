export interface Article {
  readonly title: string;
  readonly text: string;
  readonly userId: string;
  readonly comments: [string];
}
