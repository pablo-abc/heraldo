export class CreateCommentDto {
  readonly article: string;
  readonly text: string;
  readonly userId: string;

  constructor(article: string, text: string, userId: string) {
    this.article = article;
    this.text = text;
    this.userId = userId;
  }

  setArticle(article: string) {
    return new CreateCommentDto(
      article,
      this.text,
      this.userId,
    );
  }
}
