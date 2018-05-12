import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  /*
  var elmnt = document.getElementById("content");
  elmnt.scrollIntoView();
  */

  scrollTo(selector: Element | String) {
    if (selector instanceof Element) {
      selector.scrollIntoView();
      console.log("Scroll to element");
    }

  }

}
