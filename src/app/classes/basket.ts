import { Order } from 'classes/order';

export class Basket {

  orders: Array<Order> = [];

  /**
   * Add an order
   * @param order
   */
  addOrder(order: Order) {
    this.orders.push(order);
  }

}
