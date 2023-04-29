import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/types/User';

@Injectable({
  providedIn: 'root'
})
export class UsersFromServerService {
  refresh$$ = new BehaviorSubject(null);
  users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.refresh$$.pipe(switchMap(() => this.getUsers()));
  }

  getUsers() {
    return this.http.get<User[]>(
      'http://localhost:3000/users'
    );
  }

  createUser(user: User) {
    return this.http
      .post<User>('http://localhost:3000/users', user)
      .pipe(tap(() => this.refresh$$.next(null)));
  }

  updateUser(user: User) {
    return this.http
      .patch<User>(`http://localhost:3000/users/${user.email}`, user)
      .pipe(tap(() => this.refresh$$.next(null)));
  }

  deleteUser(user: User) {
    return this.http
      .delete<User>(`http://localhost:3000/users/${user.email}`)
      .pipe(tap(() => this.refresh$$.next(null)));
  }

}
