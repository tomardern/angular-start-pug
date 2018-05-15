export class User {

  private name: String;
  private email: String;
  private externalId: String;
  private hasPurchased: boolean;
  private loggedIn: boolean;

  constructor() {
  }

  setName(name: String) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setEmail(email: String) {
    this.email = email;
  }
  getEmail() {
    return this.email;
  }

  setExternalId(md5: string) {
    this.externalId = md5;
  }

  getId() {
    return 'hello-world'
  }

  setHasPurchased(bool: boolean) {
    this.hasPurchased = bool;
  }




}
