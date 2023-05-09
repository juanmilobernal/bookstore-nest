import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [BooksModule, MongooseModule.forRoot('mongodb+srv://bernal:Uy3wNOFbL7VOTgwR@cluster0.3cikcby.mongodb.net/bookstore?retryWrites=true&w=majority'), AuthorizationModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
