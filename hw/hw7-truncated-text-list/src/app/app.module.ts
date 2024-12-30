import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ItemComponent } from './item/item.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [AppComponent, MainComponent, ItemComponent],
  imports: [BrowserModule, AppRoutingModule, TruncatePipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
