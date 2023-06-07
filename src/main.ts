import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { todoReducer } from './reducers/todo.reducer';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './effects/todo.effects';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideState('todos', todoReducer),
    provideEffects(TodoEffects),
    provideAnimations(),
  ],
});
