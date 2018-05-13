import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './classes/user';
import { ScrollService } from './services/scroll.service';


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

  whenUserDetailsValidSubmit() {
    console.log('User Details is valid');
    this.scrollService.scrollTo('app-delivery-details');
  }


}
