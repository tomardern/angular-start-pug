import { Order } from 'classes/order';
import { User } from 'classes/user';
import { Purchase } from 'classes/purchase';

export class PurchaseModel {

  /**
   * Create the purchase
   * @param order
   * @param user
   */
  static create<Promise>(order: Order, user: User) {
    console.log('Backend request to create a purchase');
    return Promise.resolve();
  }

  /**
   * Add another order to the purchase
   * @param purchase
   * @param order
   */
  static addOrder<Promise>(purchase: Purchase, order: Order) {
    console.log('Backend request to add another order to purchase');
    return Promise.resolve();
  }

}

