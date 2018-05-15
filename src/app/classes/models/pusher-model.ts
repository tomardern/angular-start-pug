import { Purchase } from 'classes/purchase';
import { User } from 'classes/user';

class Channel {
  subscribe() { }
  bind(string, callback) { }
  unbind() { }
}

class Pusher {
  constructor(key, object) {

    return this;
  }
  subscribe(string) {
    return new Channel();
  }
}


export class PusherModel {


  static cancel(listener) {
    listener.unbind();
  }

  /**
   * Wait for a pusher response
   * @param user
   */
  static waitForPusher(user: User) {
    const pusherInstance = new Pusher('APP_KEY', {
      cluster: 'APP_CLUSTER',
      encrypted: true
    });

    const listener = pusherInstance.subscribe(`user_${user.getId()}`);

    const promise = new Promise((resolve, reject) => {
      listener.bind('purchase_complete', (data) => {
        return resolve({ event: 'purchase_complete', source: 'pusher', data });
      });
      listener.bind('purchase_validation_failed', (data) => {
        return reject({ event: 'purchase_validation_failed', source: 'pusher', data });
      });
      listener.bind('purchase_payment_failed', (data) => {
        return reject({ event: 'purchase_payment_failed', source: 'pusher', data });
      });
    });
    return { listener, promise };
  }

}
