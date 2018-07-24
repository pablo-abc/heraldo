export class CreateCommentDto {
    readonly article: string;
    readonly text: string;
    readonly user: string;
    readonly date: Date;
}
