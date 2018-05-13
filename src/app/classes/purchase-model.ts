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
    console.log('Backend request to create a purchase', order);
    const purchaseId = parseInt((Math.random() + '').replace('.', ''), 10);
    const orderId = parseInt((Math.random() + '').replace('.', ''), 10);
    return Promise.resolve({
      purchaseId, orderId
    });
  }

  /**
   * Add another order to the purchase
   * @param purchase
   * @param order
   */
  static addOrder<Promise>(purchase: Purchase, order: Order) {
    console.log('Backend request to add another order to purchase', order);
    const orderId = parseInt((Math.random() + '').replace('.', ''), 10);
    return Promise.resolve({
      orderId
    });
  }

  /**
   * Update an order
   * @param order
   */
  static updateOrder(purchase: Purchase, order: Order) {
    console.log("We want to update purchase", purchase, " with order", order);
    return Promise.resolve();
  }

  /**
   * Checkout a purchase
   * @param purchase
   */
  static checkout<Promise>(purchase: Purchase) {
    console.log('Backend call to purchase', purchase);
    return Promise.resolve();
  }

}

