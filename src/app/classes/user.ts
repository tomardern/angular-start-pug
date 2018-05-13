export class User {

  private name: String;
  private email: String;
  private externalId: String;
  private previouslyOrdered: Boolean;

  setName(name: String) {
    this.name = name;
  }

  setEmail(email: String) {
    this.email = email;
  }

  setExternalId(md5: string) {
    this.externalId = md5;
  }

  setPreviouslyOrdered(bool: Boolean) {
    this.previouslyOrdered = bool;
  }


}
