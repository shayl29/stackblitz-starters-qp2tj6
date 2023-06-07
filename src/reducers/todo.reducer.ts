import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../models/Todo';

export interface TodoState {
  all: Todo[];
}

export const initialState: TodoState = {
  all: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.getTodosDone, (state, { todos }) => ({
    ...state,
    all: [...todos],
  }))
);
