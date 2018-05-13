export class User {

  private name: String;
  private email: String;
  private externalId: String;
  private hasOrdered: boolean;

  setName(name: String) {
    this.name = name;
  }
  getName() {
    return this.name;
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

  setHasOrdered(bool: boolean) {
    this.hasOrdered = bool;
  }
  getHasOrdered() {
    return this.hasOrdered;
  }




}
