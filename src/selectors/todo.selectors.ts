import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';

export const selectTodos = createFeatureSelector<TodoState>('todos');
export const selectAllTodos = createSelector(selectTodos, (state) => state.all);
export const selectAllTodosTitles = createSelector(selectTodos, (state) => state.all.map(t => t.title));
