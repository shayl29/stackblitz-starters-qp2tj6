import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import * as TodoSelectors from './selectors/todo.selectors';
import * as TodoActions from './actions/todo.actions';
import { Store } from '@ngrx/store';
import { TodoState } from './reducers/todo.reducer';
import { PrimeNGModule } from './modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, PrimeNGModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class App implements OnInit {
  name = 'Angular';
  allTodos$ = this.store.select(TodoSelectors.selectAllTodos);
  allTodosTitles$ = this.store.select(TodoSelectors.selectAllTodosTitles);

  selectedItem: any;

  constructor(
    private store: Store<TodoState>,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.store.dispatch(TodoActions.getTodos());
  }

  @HostListener('p-autoComplete:completeMethod', ['$event', 'query'])
  search(query: string) {
    console.log(query);
    // this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
}
