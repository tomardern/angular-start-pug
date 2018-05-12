import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {


  /**
   * Scroll to an element or a CSS selector
   * @param selector
   */
  scrollTo(selector: Element | String) {
    if (selector instanceof Element) {
      selector.scrollIntoView();
      console.log("Scroll to element", selector);
    } else {
        /*
        var elmnt = document.getElementById("content");
        elmnt.scrollIntoView();
        */
    }
  }

}
