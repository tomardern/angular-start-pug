import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ScrollService } from 'services/scroll.service';
import { UserService } from 'services/user.service';
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
  user: User;

  /**
   * Constructor
   * @param scrollService
   * @param element
   */
  constructor(
    private scrollService: ScrollService,
    private userService: UserService,
    private emailValidationService: EmailValidationService,
    private element: ElementRef
  ) {

    // After the first setCurrentUser, the userService.user is the same reference to this.user
    this.user = new User();
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
    const nameControl = new FormControl(this.user.getName(), {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    nameControl.valueChanges.subscribe((name) => { // Instead of 'blur' event
      this.user.setName(nameControl.valid ? name : null);
      this.userService.setCurrentUser(this.userDetails.valid ? this.user : null);
    });

    this.userDetails.addControl('name', nameControl);

    // Email Control
    const emailControl = new FormControl(this.user.getEmail(), {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur' // No need for 'debounce' if updateOn is blur
    });
    emailControl.valueChanges
      .subscribe(email => {
        this.user.setEmail(emailControl.valid ? email : null);

        if (emailControl.invalid) {
          this.userService.setCurrentUser(null);
        } else {
          this.emailValidationService.checkEmail(email)
          .then((res) => {
            this.user.setExternalId(res.externalId);
            this.userService.setCurrentUser(this.userDetails.valid ? this.user : null);
          });
        }
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
