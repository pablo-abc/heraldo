export interface Article {
    readonly title: string;
    readonly date: Date;
    readonly text: string;
    readonly user: string;
    readonly comments: [string];
}
