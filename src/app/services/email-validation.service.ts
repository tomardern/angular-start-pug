import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  private checkProimise: Promise<void>;

  constructor() { }


  checkEmail(email: string) { //TODO - decide lower or camel case for string
    return Promise.resolve({
      externalId: 'helloWorld',
      previouslyOrdered: true
    });
  }

}
