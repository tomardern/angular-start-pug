import { Order } from 'classes/order';
import { User } from 'classes/user';
import { Purchase } from 'classes/purchase';
import { PusherModel } from 'classes/models/pusher-model';

export class PurchaseModel {

  /**
   * Create the purchase
   * @param order
   * @param user
   */
  static create(order: Order, user: User): Promise<any> {
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
  static finalise<Promise>(purchase: Purchase) {
    console.log('Backend call to purchase', purchase);
    return Promise.resolve();
  }

  private static checkPurchaseStatus(purchase) {
    console.log('Backend call to check purchase status', purchase);
  }


  poll2(times, msTimeout, promiseFn) {
    let timeout;
    let counter = 0;

    return new Promise((resolve, reject) => {
      const fn = () => {
        counter++;
        if (counter === times) {
          reject();
        } else {
          promiseFn().then((val) => {
            clearTimeout(timeout);
            resolve(val);
          })
          .catch(() => {
            timeout = setTimeout(fn, msTimeout);
          });
        }
      };
      fn();
    });
  }


  poll(times, msTimeout, promiseFn) {
    let interval;
    let counter = 0;

    return new Promise((resolve, reject) => {
      interval = setInterval(() => {
        counter++;
        promiseFn().then((val) => {
          clearInterval(val);
          resolve(val);
        });
        if (interval === times) {
          clearInterval(interval);
          reject();
        }
      }, msTimeout);
    });

  }


  /**
   * Wait for success
   * @param user
   */
  waitForSuccess(purchase: Purchase, user: User) {

    const pusher = PusherModel.waitForPusher(user);

    return Promise.race([
      pusher.promise,
    ])
      .then(() => {
        PusherModel.cancel(pusher.listener);

      })
      .catch(() => {
        PusherModel.cancel(pusher.listener);
      });
  }

}

