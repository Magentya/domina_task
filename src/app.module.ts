import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { databaseOptions } from './db/database.providers';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot(databaseOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
