import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import * as process from 'process';

import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@movies.vsww768.mongodb.net/?retryWrites=true&w=majority`,
    ),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}