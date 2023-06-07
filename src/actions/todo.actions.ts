import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

export const getTodos = createAction('[To do] Get List');
export const getTodosDone = createAction(
  '[To do] Get List Done',
  props<{ todos: Todo[] }>()
);
export const getTodosError = createAction(
  '[To do] Get List Error',
  props<{ error: any }>()
);
export const getTodo = createAction(
  '[To do] Get',
  props<{ id: number }>()
);
export const getTodoDone = createAction(
  '[To do] Get Done',
  props<{ todo: Todo }>()
);
export const getTodoError = createAction(
  '[To do] Get Error',
  props<{ error: any }>()
);
