import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DescopeAuthService } from '@descope/angular-sdk';
import { generateClient } from 'aws-amplify/api';
import { firstValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { createTodo, deleteTodo } from '~mutations';
import { listTodos } from '~queries';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private client = generateClient();
  private descopeSvc = inject(DescopeAuthService);

  todos: any[] = [];

  user$ = this.descopeSvc.user$.pipe(map(descopeUser => descopeUser?.user));

  ngOnInit(): void{
    this.getTodos();
  }

  async addTodo(): Promise<void> {
    const user = await firstValueFrom(this.user$.pipe(take(1)));

    console.log('user', user);

    await this.client.graphql({
      query: createTodo,
      variables: {
        input: {
          name: `New Todo ${this.todos.length + 1}`,
          description: `New Todo  ${this.todos.length + 1} Description`,
          owner: user?.userId
        },
      }
    });

    await this.getTodos();
  }

  async deleteTodo(todo: any): Promise<void> {
    await this.client.graphql({
      query: deleteTodo,
      variables: {
        input: {
          id: todo.id
        }
      }
    });

    await this.getTodos();
  }

  async getTodos(): Promise<void> {
    this.todos = ((await this.client.graphql({
      query: listTodos
    })) as any)?.data.listTodos.items;
    this.cdr.markForCheck();
  }
}
