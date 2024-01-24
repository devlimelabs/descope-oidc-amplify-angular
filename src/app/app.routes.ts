import { Routes } from '@angular/router';
import { descopeAuthGuard } from '@descope/angular-sdk';

export const routes: Routes = [{
  path: 'todos',
  canActivate: [descopeAuthGuard],
  loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent),
}];
