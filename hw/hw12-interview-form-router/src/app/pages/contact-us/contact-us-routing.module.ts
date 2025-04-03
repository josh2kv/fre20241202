import { ROUTE_SEGMENTS } from '@/core/config/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';

const routes: Routes = [
  {
    path: ROUTE_SEGMENTS.ROOT,
    component: ContactUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsRoutingModule {}
