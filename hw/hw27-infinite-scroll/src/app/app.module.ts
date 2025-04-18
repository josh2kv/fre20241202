import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TestimonialListComponent } from './components/testimonial-list/testimonial-list.component';

@NgModule({
  declarations: [AppComponent, TestimonialListComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
