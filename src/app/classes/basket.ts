import { Order } from 'classes/order';
import { Subject } from 'rxjs';

export class Basket {
  orders: Array<Order> = [];
  ordersChanges$ = new Subject<Order>();

  private user;

  /**
   * Add an order
   * @param order
   */
  addOrder(order: Order) {
    this.orders.push(order);
    this.ordersChanges$.next(order);
  }

  /**
   * Get Orders
   */
  getOrders<Array>() {
    return this.orders;
  }

}
