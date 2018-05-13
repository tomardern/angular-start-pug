import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'classes/user';
import { ScrollService } from 'services/scroll.service';
import { PurchaseService } from 'services/purchase.service';
import { UserService } from 'services/user.service';

import { Order } from 'classes/order';
import { Purchase } from 'classes/purchase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  checkoutForm: FormGroup = new FormGroup({});

  private order: Order = new Order();
  private purchase: Purchase;

  constructor(
    private purchaseService: PurchaseService,
    private userService: UserService,
    private scrollService: ScrollService
  ) {

    this.userService.userChanges$.subscribe((user) => {
      console.log('User is', user);
    });

    this.purchase = this.purchaseService.getPurchase();

    this.purchase.ordersChanges$.subscribe((order) => {
      console.log('New order on purchase', order);
    });

  }


  whenUserDetailsValidSubmit() {
    this.scrollService.scrollTo('app-delivery-details');
  }

  submitCheckout() {
    if (this.checkoutForm.valid) {
      this.order.name = 'First Order!';
      this.purchaseService.addOrder(this.order)
        .then(() => {

          this.order = new Order(); // Reset the order
        });
    } else {
      alert('Not valid');
    }
  }


}
