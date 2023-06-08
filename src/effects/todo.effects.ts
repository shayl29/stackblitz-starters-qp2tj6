import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../services/api.service';
import * as TodoActions from '../actions/todo.actions';
import * as TodoSelectors from '../selectors/todo.selectors';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { catchError, of, tap } from 'rxjs';
import { TodoState } from '../reducers/todo.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class TodoEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodos),
      switchMap(() =>
        this.apiService.getTodos().pipe(
          map((todos) => TodoActions.getTodosDone({ todos })),
          catchError((error) => of(TodoActions.getTodosError({ error })))
        )
      )
    )
  );

  filterSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.filterSuggestions),
      withLatestFrom(
        this.store.select(TodoSelectors.selectAllTodosTitles).pipe()
      ),
      distinctUntilChanged(),
      debounceTime(100),
      map(([action, titles = []]) =>
        titles.filter((t) => t.includes(action.query))
      ),
      map((suggestions) => TodoActions.setSuggestions({ suggestions }))
    )
  );

  filterTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.setQuery),
      withLatestFrom(this.store.select(TodoSelectors.selectAllTodos).pipe()),
      map(([{ query }, todos]) => todos.filter((t) => t.title.includes(query))),
      map((filtered) => TodoActions.setFilteredTodos({ filtered }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<TodoState>,
    private apiService: ApiService
  ) {}
}
