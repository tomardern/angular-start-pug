import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'classes/user';
import { ScrollService } from 'services/scroll.service';
import { BasketService } from 'services/basket.service';
import { UserService } from 'services/user.service';

import { Order } from 'classes/order';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  checkoutForm: FormGroup = new FormGroup({});

  private order: Order = new Order();

  constructor(
    private basketService: BasketService,
    private userService: UserService,
    private scrollService: ScrollService
  ) {

    this.userService.userChanges$.subscribe((user) => {
      console.log('User is', user);
    });

  }


  whenUserDetailsValidSubmit() {
    this.scrollService.scrollTo('app-delivery-details');
  }

  submitCheckout() {
    this.basketService.addOrder(this.order);
  }


}
