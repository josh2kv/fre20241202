import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UndoableCounterWithoutSubjectComponent } from './undoable-counter-without-subject/undoable-counter-without-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    UndoableCounterWithoutSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
