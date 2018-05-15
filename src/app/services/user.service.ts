import { Injectable } from '@angular/core';
import { User } from 'classes/user';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'classes/models/user-model';

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

  /**
   * Update User
   *  - Maybe prefixing with 'update' should always result in a backend call?
   * @param data
   * @param user
   */
  updateUser(data, user?: User) {
    const u = user || this.getUser() || new User();
    return UserModel.update(data, u);
  }

  /**
   * Update the email preference for a user
   * @param data
   * @param user
   */
  updateEmailPreference(data, user?: User) {
    const u = user || this.getUser() || new User();
    return UserModel.updateEmailPreference(data, u);
  }



}
