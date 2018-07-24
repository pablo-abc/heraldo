export class CreateCommentDto {
    readonly article: string;
    readonly text: string;
    readonly user: string;
    readonly date: Date;

    constructor(article: string, text: string, user: string, date: Date) {
        this.article = article;
        this.text = text;
        this.user = user;
        this.date = date;
    }

    setArticle(article: string) {
        return new CreateCommentDto(
            article,
            this.text,
            this.user,
            this.date,
        );
    }
}
