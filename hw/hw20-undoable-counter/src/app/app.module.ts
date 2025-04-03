import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UndoableCounterWithoutSubjectsComponent } from './undoable-counter-without-subjects/undoable-counter-without-subjects.component';
import { UndoableCounterWithSubjectsComponent } from './undoable-counter-with-subjects/undoable-counter-with-subjects.component';

@NgModule({
  declarations: [AppComponent, UndoableCounterWithoutSubjectsComponent, UndoableCounterWithSubjectsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
