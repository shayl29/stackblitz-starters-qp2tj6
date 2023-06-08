import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import * as TodoSelectors from './selectors/todo.selectors';
import * as TodoActions from './actions/todo.actions';
import { Store } from '@ngrx/store';
import { TodoState } from './reducers/todo.reducer';
import { PrimeNGModule } from './modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, PrimeNGModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class App implements OnInit, OnDestroy {
  name = 'Angular';
  destroy$ = new Subject<void>();
  allTodos$ = this.store.select(TodoSelectors.selectAllTodos);
  suggestions$ = this.store.select(TodoSelectors.selectSuggestions);
  suggestions: string[] = [];

  selectedItem: any;

  constructor(
    private store: Store<TodoState>,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = false;
    this.store.dispatch(TodoActions.getTodos());
    this.store
      .select(TodoSelectors.selectSuggestions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((suggestions) => (this.suggestions = suggestions));
  }

  search(query: string) {
    this.store.dispatch(TodoActions.filterSuggestions({ query }));
  }

  select(query: string) {
    this.store.dispatch(TodoActions.setQuery({ query }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
