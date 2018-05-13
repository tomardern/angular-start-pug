import { Injectable } from '@angular/core';
import { User } from 'classes/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user: User;
  public userChanges$: Subject<User> =  new Subject<User>();

  setCurrentUser(user) {
    this.user = user;
    this.userChanges$.next(user);
  }

  getCurrentUser() {
    return this.user;
  }


}
