import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'classes/user';
import { ScrollService } from 'services/scroll.service';
import { BasketService } from 'services/basket.service';
import { UserService } from 'services/user.service';

import { Order } from 'classes/order';
import { Basket } from 'classes/basket';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  checkoutForm: FormGroup = new FormGroup({});

  private order: Order = new Order();
  private basket: Basket;

  constructor(
    private basketService: BasketService,
    private userService: UserService,
    private scrollService: ScrollService
  ) {

    this.userService.userChanges$.subscribe((user) => {
      console.log('User is', user);
    });

    this.basket = this.basketService.getBasket();

    this.basket.ordersChanges$.subscribe((order) => {
      console.log('New order on basket', order);
    });

  }


  whenUserDetailsValidSubmit() {
    this.scrollService.scrollTo('app-delivery-details');
  }

  submitCheckout() {
    if (this.checkoutForm.valid) {
      this.order.name = 'First Order!';
      this.basketService.addOrder(this.order)
        .then(() => {

          this.order = new Order(); // Reset the order
        });
    } else {
      alert('Not valid');
    }
  }


}
