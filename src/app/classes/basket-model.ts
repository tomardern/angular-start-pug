import { Order } from 'classes/order';
import { User } from 'classes/user';
import { Basket } from 'classes/basket';

export class BasketModel {

  /**
   * Create the basket
   * @param order
   * @param user
   */
  static create<Promise>(order: Order, user: User) {
    console.log('Backend request to create a purchase');
    return Promise.resolve();
  }

  /**
   * Add another order to the basket
   * @param basket
   * @param order
   */
  static addOrder<Promise>(basket: Basket, order: Order) {
    console.log('Backend request to add another order to purchase');
    return Promise.resolve();
  }

}

