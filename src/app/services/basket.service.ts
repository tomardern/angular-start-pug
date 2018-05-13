import { Injectable } from '@angular/core';
import { Basket } from 'classes/basket';
import { Order } from 'classes/order';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private currentBasket: Basket = new Basket();

  constructor() { }


  addOrder(order: Order) {
    this.currentBasket.addOrder(order);
  }


}
