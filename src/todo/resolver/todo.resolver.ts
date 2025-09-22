import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from '../dtos/inputs/todo.input';
import { TodoService } from '../services/todo.service';
import { StatusArgs } from '../dtos/args/status.args';
import { AggregationsType } from '../types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'getAllTodos' })
  findAll(
    @Args('status', { type: () => StatusArgs, nullable: true })
    statusArgs: StatusArgs,
  ) {
    return this.todoService.getAllTodos(statusArgs);
  }

  @Query(() => Todo, { name: 'getTodo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todoService.getTodoById(id);
  }

  //Agregations
  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
      completedTodos: this.todoService.completedTodos,
    };
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(
    @Args('createTodoInput', { type: () => CreateTodoInput })
    createTodoInput: CreateTodoInput,
  ) {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(
    @Args('updateTodoInput', { type: () => UpdateTodoInput })
    updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.updateTodo(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => String, { name: 'deleteTodo' })
  deleteTodo(@Args('id', { type: () => String }) id: string) {
    return this.todoService.deleteTodo(id);
  }
}
