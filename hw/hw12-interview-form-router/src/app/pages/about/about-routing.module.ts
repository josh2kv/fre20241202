import { ROUTE_SEGMENTS } from '@/core/config/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: ROUTE_SEGMENTS.ROOT,
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
