import { Injectable } from '@angular/core';
import { User } from 'classes/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user$: BehaviorSubject<User> = new BehaviorSubject(new User());

  setCurrentUser(user) {
    this.user$.next(user);
  }

  getUser() {
    return this.user$.getValue();
  }



}
