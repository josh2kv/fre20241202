import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UndoableCounterWithoutSubjectsComponent } from './undoable-counter-without-subjects/undoable-counter-without-subjects.component';
import { UndoableCounterWithSubjectsComponent } from './undoable-counter-with-subjects/undoable-counter-with-subjects.component';
import { FluxWSComponent } from './undoable-counter-with-subjects/flux-w-s/flux-w-s.component';
import { FluxWoSComponent } from './undoable-counter-without-subjects/flux-wo-s/flux-wo-s.component';

@NgModule({
  declarations: [
    AppComponent,
    UndoableCounterWithoutSubjectsComponent,
    UndoableCounterWithSubjectsComponent,
    FluxWSComponent,
    FluxWoSComponent,
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
