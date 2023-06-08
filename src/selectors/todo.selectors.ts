import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';

export const selectTodos = createFeatureSelector<TodoState>('todos');
export const selectAllTodos = createSelector(selectTodos, (state) => state.all);
export const selectFilteredTodos = createSelector(selectTodos, (state) => state.filtered);
export const selectSuggestions = createSelector(selectTodos, (state) => state.suggestions);
export const selectAllTodosTitles = createSelector(selectAllTodos, (state) => state.map(t => t.title));
