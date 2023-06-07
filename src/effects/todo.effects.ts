import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../services/api.service";
import * as TodoActions from '../actions/todo.actions'
import { map, switchMap } from "rxjs/operators";
import { catchError, of, tap } from "rxjs";

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


  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}