import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
const { DB_NAME: dbname, DB_USER: dbuser, DB_HOST: dbhost, DB_PORT: dbport } = process.env;
const dburi = `mongodb://${dbhost}:${dbport}/${dbname}`;

@Module({
    imports: [ArticlesModule, MongooseModule.forRoot(dburi), UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
