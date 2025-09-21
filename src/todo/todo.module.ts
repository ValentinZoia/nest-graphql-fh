import { Module } from '@nestjs/common';
import { TodoResolver } from './resolver/todo.resolver';
import { TodoService } from './services/todo.service';

@Module({
  providers: [TodoResolver, TodoService]
})
export class TodoModule {}
