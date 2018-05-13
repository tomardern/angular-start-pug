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

    this.purchase = this.purchaseService.getPurchase();
  }


  whenUserDetailsValidSubmit() {
    this.scrollService.scrollTo('app-delivery-details');
  }

  /**
   * Update the last order
   */
  updateLastOrder() {
    const currentOrders = this.purchase.getOrders();
    const toUpdate = currentOrders[currentOrders.length - 1].clone(); // The last one
    toUpdate.name = 'Tom Updated';
    this.purchaseService.updateOrder(toUpdate);
  }

  /**
   * Submit the checkout
   */
  submitCheckout() {
    // if (this.checkoutForm.valid) {
      this.order.name = 'An Order!';
      this.purchaseService.addOrder(this.order)
        .then(() => {
          this.order = new Order(); // Reset the order
        });

    // } else {
      // alert('Not valid');
    // }
  }

  checkout() {
    return this.purchaseService.checkout().then(() => {
      const purchased = this.purchase.clone();
      this.purchaseService.reset();
      this.purchase = this.purchaseService.getPurchase();
      console.log('We purchase', purchased);
    });
  }


}
