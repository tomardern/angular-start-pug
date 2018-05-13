export class Order {

  public name: String;

  public id: Number;

  /**
   * Set the Id for the order
   * @param id
   */
  setId(id: Number) {
    this.id = id;
  }


  clone() {
    return Object.assign(new Order(), this);
  }

}
