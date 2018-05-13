import { Order } from 'classes/order';
import { BehaviorSubject } from 'rxjs'; // Like a subject but can do getValue()

export class Purchase {
  orders$: BehaviorSubject<Order[]>  = new BehaviorSubject([]);

  private user;
  public id;

  constructor() {

  }

  setId(id) {
    this.id = id;
  }

  /**
   * Add an order
   * @param order
   */
  addOrder(order: Order) {
    const current = this.orders$.getValue();
    current.push(order);
    this.orders$.next(current);
  }

  /**
   * Update an order in the purchase
   * @param order
   */
  updateOrder(order) {
    const current = this.orders$.getValue();
    const index = current.findIndex(o => o.id === order.id);
    current[index] = order;
    this.orders$.next(current);
  }


  /**
   * Get Orders
   */
  getOrders() {
    return this.orders$.getValue();
  }


  clone() {
    return Object.assign(new Purchase(), this);
  }



}
