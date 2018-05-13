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

  reset() {
    this.purchase = new Purchase();
  }

  /**
   * Add to the order
   * @param order
   */
  addOrder<Promise>(order: Order) {
    let p;

    if (this.purchase.getOrders().length < 1) {
      const user: User = this.userService.getCurrentUser();
      p = PurchaseModel.create(order, user)
        .then((res) => {
          this.purchase.setId(res.purchaseId);
          return res;
        });
    } else {
      p = PurchaseModel.addOrder(this.purchase, order);
    }

    return p.then((res) => {
      order.setId(res.orderId);
      this.purchase.addOrder(order);
    });
  }

  /**
   * Update an order
   * @param order
   */
  updateOrder(order: Order) {
    return PurchaseModel.updateOrder(this.purchase, order)
      .then(() => {
        this.purchase.updateOrder(order);
      });
  }

  /**
   * Checout the purchase
   */
  checkout() {
    return PurchaseModel.checkout(this.purchase);
  }



}
