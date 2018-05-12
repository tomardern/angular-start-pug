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

  constructor(private fb: FormBuilder, private scrollService: ScrollService) {
  }

  /**
   * When the user details change
   * @param obj
   */
  whenUserDetailsChange(obj) {
    console.log('whenUserDetailsChange',obj);

    if (obj.via === 'button') {
      this.scrollService.scrollTo('app-delivery-details');
    }

  }


}
