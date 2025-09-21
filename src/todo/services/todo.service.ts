import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from '../dtos/inputs/todo.input';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  public getAllTodos(): Todo[] {
    return this.findAll();
  }
  public getTodoById(id: string): Todo | NotFoundException {
    const result = this.findOne(id);

    if (!result) {
      return new NotFoundException(`Tarea con id : ${id} no encontrada`);
    }

    return result;
  }

  public createTodo(task: CreateTodoInput): Todo {
    const createdTodo = this.create(task);
    return createdTodo;
  }

  public updateTodo(id: string, updateTodoDto: UpdateTodoInput): Todo {
    console.log(updateTodoDto);
    const updatedTodo = this.update(id, updateTodoDto);
    return updatedTodo;
  }

  public updatePartialTodo(id: string): Todo {
    this.todos = this.todos.map((task) =>
      task.id === id ? { ...task, name: 'Todo actualizada' } : task,
    );
    if (this.todos.find((task) => task.id === id)) {
      return this.todos.find((task) => task.id === id) as Todo;
    }

    return {} as Todo;
  }

  public deleteTodo(id: string): string {
    this.deleteOne(id);

    return `Tarea con id : ${id} eliminada exitosamente`;
  }

  private findOne(id: string): Todo {
    return this.todos.find((task) => task.id === id) as Todo;
  }

  private deleteOne(id: string): Todo {
    const result = this.todos.find((task) => task.id === id) as Todo;
    this.todos = this.todos.filter((task) => task.id !== id);
    return result;
  }

  private findAll(): Todo[] {
    return this.todos;
  }

  private create(task: CreateTodoInput): Todo {
    this.todos.push({ ...task, id: Math.random().toString() });
    return this.todos[this.todos.length - 1];
  }

  private update(id: string, taskUpdated: UpdateTodoInput): Todo {
    this.todos = this.todos.map((task) =>
      task.id === id ? { ...task, ...taskUpdated } : task,
    );
    return this.todos.find((task) => task.id === id) as Todo;
  }
}
