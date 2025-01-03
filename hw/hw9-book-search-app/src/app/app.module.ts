import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { WishlistComponent } from '@pages/wishlist/wishlist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModuleModule } from '@shared/material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from '@pages/home/search-section/search-bar/search-bar.component';
import { SearchResultComponent } from '@pages/home/search-section/search-result/search-result.component';
import { SearchSectionComponent } from '@pages/home/search-section/search-section.component';
import { WishlistSectionComponent } from '@pages/home/wishlist-section/wishlist-section.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WishlistComponent,
    SearchSectionComponent,
    SearchBarComponent,
    SearchResultComponent,
    WishlistSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModuleModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
