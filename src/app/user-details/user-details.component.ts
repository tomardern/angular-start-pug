import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from '../services/scroll.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  @Output() whenValid: EventEmitter<any> = new EventEmitter<any>();

  userDetails: FormGroup;

  /**
   * Constructor
   * @param fb
   * @param scrollService
   * @param element
   */
  constructor(
    private fb: FormBuilder,
    private scrollService: ScrollService,
    private element: ElementRef
  ) {
    this.createForm();
  }

  /**
   * On init
   */
  ngOnInit() {
    this.checkoutForm.addControl('userDetails', this.userDetails);
  }

  /**
   * Create the form group and fields
   */
  createForm() {
    this.userDetails = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  /**
   * Once a field is blurred, check it's valid, then output the created user
   */
  onFieldBlur() {
    if (this.userDetails.valid) {
      this.whenValid.emit({
        user: this.createUser()
      });
    }
  }

  /**
   * Create a user
   * TODO: Probably move this somewhere else?
   */
  createUser() {
    const user = new User();
    user.setName(this.userDetails.get('name').value);
    user.setEmail(this.userDetails.get('email').value);
    return user;
  }


  /**
   * On Submit
   */
  onSubmit() {
    if (this.userDetails.valid) {
      this.whenValid.emit({
        via: 'button',
        user: this.createUser()
      });
    } else {
      this.scrollService.scrollTo(this.element.nativeElement);
    }
  }

}
