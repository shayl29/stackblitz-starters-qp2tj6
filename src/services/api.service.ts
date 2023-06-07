import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  public getTodo(id: number) {
    return this.httpClient.get<Todo[]>(`${this.apiUrl}/todos/${id}`);
  }
}
