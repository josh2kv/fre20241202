import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UndoableCounterWithoutSubjectsComponent } from './undoable-counter-without-subjects/undoable-counter-without-subjects.component';

@NgModule({
  declarations: [AppComponent, UndoableCounterWithoutSubjectsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
