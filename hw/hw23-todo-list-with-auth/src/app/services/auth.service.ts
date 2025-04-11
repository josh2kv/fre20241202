import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  retrieveDataFromLocalStorage,
  storeDataToLocalStorage,
} from '../utils';

interface User {
  username: string;
  password: string;
  expiredAt: number | null;
}

const initialUsers: User[] = [
  {
    username: 'asas',
    password: 'asas',
    expiredAt: null,
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly SESSION_TIME = 60 * 1000; // 1 minutes
  readonly USERS_KEY = 'users';
  readonly CURRENT_USER_KEY = 'current-user';

  private readonly usersSubject = new BehaviorSubject<User[]>(initialUsers);
  readonly users$ = this.usersSubject.asObservable();
  private readonly currentUserSubject = new BehaviorSubject<string | null>(
    null
  );
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const users = retrieveDataFromLocalStorage<User[]>(this.USERS_KEY);
    if (users) {
      this.usersSubject.next(users);
    } else {
      storeDataToLocalStorage(this.USERS_KEY, initialUsers);
    }

    const currentUser = retrieveDataFromLocalStorage<string>(
      this.CURRENT_USER_KEY
    );
    if (currentUser) {
      this.currentUserSubject.next(currentUser);
    } else {
      storeDataToLocalStorage(this.CURRENT_USER_KEY, null);
    }

    this.usersSubject.subscribe((users) =>
      storeDataToLocalStorage(this.USERS_KEY, users)
    );
    this.currentUserSubject.subscribe((currentUser) =>
      storeDataToLocalStorage(this.CURRENT_USER_KEY, currentUser)
    );
  }

  getUserByUsername(username: string): User | null {
    return this.users.find((user) => user.username === username) || null;
  }

  getUserIndex(username: string): number {
    return this.users.findIndex((user) => user.username === username);
  }

  // upsertUser(user: User): User {
  //   const index = this.getUserIndex(user.username);
  //   if (!index) throw new Error('404');

  //   const users = this.users;
  //   this.usersSubject.next([
  //     ...this.users.slice(0, index),
  //     user,
  //     ...users.slice(index + 1),
  //   ]);

  //   return user;
  // }

  updateCurrentUser(username: string): string {
    this.currentUserSubject.next(username);
    return username;
  }

  updateSession(user: User, isLogout: boolean = false): Omit<User, 'password'> {
    const expiredAt = isLogout
      ? null
      : new Date().getTime() + this.SESSION_TIME;
    const foundIndex = this.getUserIndex(user.username);

    const newUser = { ...user, expiredAt };
    if (foundIndex >= 0) {
      this.usersSubject.next([
        ...this.users.slice(0, foundIndex),
        newUser,
        ...this.users.slice(foundIndex + 1),
      ]);
    } else {
      this.usersSubject.next([...this.users, newUser]);
    }

    return { username: user.username, expiredAt };
  }

  login(username: string, password: string): Omit<User, 'password'> {
    const user = this.getUserByUsername(username);
    if (!user) throw new Error('404');

    if (user.password !== password) throw new Error('401');

    this.updateCurrentUser(username);
    return this.updateSession(user);
  }

  logout(): void {
    const user = this.users.find((user) => user.username === this.currentUser);
    if (!user) throw new Error('404');

    this.updateSession(user, true);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const found = this.users.find((user) => user.username === this.currentUser);

    return found && found.expiredAt
      ? found.expiredAt > new Date().getTime()
      : false;
  }

  getSessionRemained(): number {
    const found = this.users.find((user) => user.username === this.currentUser);
    if (!found) return 0;

    return Math.floor((found.expiredAt! - new Date().getTime()) / 1000);
  }

  get users(): User[] {
    return this.usersSubject.getValue();
  }

  get currentUser(): string | null {
    return this.currentUserSubject.getValue();
  }
}
