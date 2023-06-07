import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../services/api.service";
import * as TodoActions from '../actions/todo.actions'
import { debounceTime, distinctUntilChanged, map, switchMap, withLatestFrom } from "rxjs/operators";
import { catchError, of, tap } from "rxjs";
import { TodoState } from "src/reducers/todo.reducer";
import { Store } from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class TodoEffects {

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodos),
      switchMap(() => {
        return this.apiService.getTodos().pipe(
          map(todos => TodoActions.getTodosDone({todos})),
          catchError(error => of(TodoActions.getTodosError({error})))
        )
      })
    )
  );

  filter$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TodoActions.filterTodos),
        withLatestFrom(this.store.select(s => s.all)),
        distinctUntilChanged(),
        debounceTime(100),
        map(([{query}, todos]) => {
          const filtered = todos.filter(t => t.title.includes(query));
          return TodoActions.setFilteredTodos({filtered})
        })
      )
  );


  constructor(
    private actions$: Actions,
    private store: Store<TodoState>,
    private apiService: ApiService
  ) {}
}