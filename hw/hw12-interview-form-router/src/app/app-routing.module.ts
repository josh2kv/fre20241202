import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_SEGMENTS } from '@/core/config/routes';

const routes: Routes = [
  {
    path: ROUTE_SEGMENTS.ROOT,
    pathMatch: 'full',
    redirectTo: ROUTE_SEGMENTS.DIRECTORY,
  },
  {
    path: ROUTE_SEGMENTS.DIRECTORY,
    loadChildren: () =>
      import('./pages/directory/directory.module').then(
        (m) => m.DirectoryModule
      ),
  },
  {
    path: ROUTE_SEGMENTS.CONTACT_US,
    loadChildren: () =>
      import('./pages/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: ROUTE_SEGMENTS.ABOUT,
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
