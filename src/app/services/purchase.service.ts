import { Injectable } from '@angular/core';
import { Purchase } from 'classes/purchase';
import { PurchaseModel } from 'classes/purchase-model';
import { UserService } from 'services/user.service';
import { Order } from 'classes/order';
import { User } from 'classes/user';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchase: Purchase = new Purchase();

  constructor(
    private userService: UserService
  ) {
  }

  getPurchase() {
    return this.purchase;
  }

  /**
   * Add to the order
   * @param order
   */
  addOrder<Promise>(order: Order) {
    let p;

    if (this.purchase.getOrders().length < 1) {
      const user: User = this.userService.getCurrentUser();
      p = PurchaseModel.create(order, user);
    } else {
      p = PurchaseModel.addOrder(this.purchase, order);
    }

    return p.then(() => {
      this.purchase.addOrder(order);
    });
  }



}
