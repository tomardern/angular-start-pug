import { Injectable } from '@angular/core';
import { Basket } from 'classes/basket';
import { BasketModel } from 'classes/basket-model';
import { UserService } from 'services/user.service';
import { Order } from 'classes/order';
import { User } from 'classes/user';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket: Basket = new Basket();

  constructor(
    private userService: UserService
  ) {
  }

  getBasket() {
    return this.basket;
  }

  /**
   * Add to the order
   * @param order
   */
  addOrder<Promise>(order: Order) {
    let p;

    if (this.basket.getOrders().length < 1) {
      const user: User = this.userService.getCurrentUser();
      p = BasketModel.create(order, user);
    } else {
      p = BasketModel.addOrder(this.basket, order);
    }

    return p.then(() => {
      this.basket.addOrder(order);
    });
  }



}
