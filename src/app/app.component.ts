import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './classes/user';
import { ScrollService } from 'services/scroll.service';
import { BasketService } from 'services/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  checkoutForm: FormGroup = new FormGroup({});

  private user: User;

  constructor(private fb: FormBuilder, private scrollService: ScrollService) {
  }

  /**
   * When the user details change
   * @param obj
   */
  whenUserDetailsChange(user: User) {
    console.log('whenUserDetailsChange', user);
  }

  whenUserDetailsValidSubmit(user: User) {
    console.log('User Details is valid for user', user);
    this.scrollService.scrollTo('app-delivery-details');
  }


  submitCheckout() {
    alert('here');
  }


}
