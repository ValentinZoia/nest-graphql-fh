import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from '../dtos/inputs/todo.input';
import { TodoService } from '../services/todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'getAllTodos' })
  findAll() {
    return this.todoService.getAllTodos();
  }

  @Query(() => Todo, { name: 'getTodo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todoService.getTodoById(id);
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
