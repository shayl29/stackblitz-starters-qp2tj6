import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../models/Todo';

export interface TodoState {
  all: Todo[];
  filtered: Todo[];
  suggestions: string[]
  query: string;
}

export const initialState: TodoState = {
  all: [],
  filtered: [],
  suggestions: [],
  query: ''
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.getTodosDone, (state, { todos }) => ({
    ...state,
    all: [...todos],
  })),
  on(TodoActions.setFilteredTodos, (state, {filtered}) => ({...state, filtered})),
  on(TodoActions.setSuggestions, (state, {suggestions}) => ({...state, suggestions}))
);
