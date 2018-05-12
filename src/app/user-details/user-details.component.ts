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
  @Output() whenValid: EventEmitter<User> = new EventEmitter<User>();

  userDetails: FormGroup;

  constructor(
    private fb: FormBuilder,
    private scrollService: ScrollService,
    private element: ElementRef
  ) {
    this.createForm();
  }

  createForm() {
    this.userDetails = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onFieldBlur() {
    if (this.userDetails.valid) {
      this.whenValid.emit(this.createUser());
    }
  }

  createUser() {
    const user = new User();
    user.setName(this.userDetails.get('name').value);
    user.setEmail(this.userDetails.get('email').value);
    return user;
  }


  ngOnInit() {
    this.checkoutForm.addControl('userDetails', this.userDetails);
  }

  onSubmit() {
    if (this.userDetails.valid) {
      this.whenValid.emit(this.createUser());
    } else {
      this.scrollService.scrollTo(this.element.nativeElement);
    }
  }

}
