import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ScrollService } from 'services/scroll.service';
import { BasketService } from 'services/basket.service';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from 'components/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    BasketService,
    ScrollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
