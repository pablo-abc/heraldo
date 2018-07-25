export interface User {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly created: Date;
    readonly modified: Date;
}
