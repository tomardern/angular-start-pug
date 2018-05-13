import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ScrollService } from 'services/scroll.service';
import { User } from 'classes/user';
import { EmailValidationService } from 'services/email-validation.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  @Output() whenChanged: EventEmitter<User> = new EventEmitter<User>();
  @Output() whenValidSubmit: EventEmitter<User> = new EventEmitter<User>();

  userDetails: FormGroup = new FormGroup({});
  user: User = new User();

  /**
   * Constructor
   * @param scrollService
   * @param element
   */
  constructor(
    private scrollService: ScrollService,
    private emailValidationService: EmailValidationService,
    private element: ElementRef
  ) {
    this.createForm();
  }

  /**
   * On init, add the control to the parent form
   */
  ngOnInit() {
    this.checkoutForm.addControl('userDetails', this.userDetails);
  }

  /**
   * Create the form group and fields
   */
  createForm() {

    // Name Control
    const nameControl = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    nameControl.valueChanges.subscribe((name) => { // Instead of 'blur' event
      this.user.setName(name);
      this.whenChanged.emit(this.userDetails.valid ? this.user : null);
    });

    this.userDetails.addControl('name', nameControl);

    // Email Control
    const emailControl = new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur' // No need for 'debounce' if updateOn is blur
    });
    emailControl.valueChanges
      .subscribe(email => {
        this.user.setEmail(email);
        return this.emailValidationService.checkEmail(email)
          .then((res) => {
            this.user.setExternalId(res.externalId);
            this.user.setPreviouslyOrdered(res.previouslyOrdered);
            this.whenChanged.emit(this.userDetails.valid ? this.user : null);
          });
      });

    this.userDetails.addControl('email', emailControl);
  }


  /**
   * On Submit
   */
  onSubmit() {
    if (this.userDetails.valid) {
      this.whenValidSubmit.emit(this.user);
    } else {
      this.scrollService.scrollTo(this.element.nativeElement);
    }
  }

}
