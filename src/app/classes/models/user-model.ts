import { User } from 'classes/user';

/**
 * Email Preference
 */
interface EmailPreference {
  email_preference: number;
  consent_message?: string; // Optional
}


/**
 * User Model
 */
export class UserModel {


  /**
   * Update the user in the backend
   * @param data
   * @param user
   */
  static update(data, user: User) {
    console.log('Backend call to update user ', data);
    return Promise.resolve();
  }

  /**
   * Update email preference
   * @param data
   * @param user
   */
  static updateEmailPreference(data: EmailPreference, user: User) {
    return Promise.resolve();
  }

}
