import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { HomeComponent } from '@pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'browse',
    loadChildren: () =>
      import('./pages/browse/browse.module').then((m) => m.BrowseModule),
  },
  {
    path: 'auth',
    children: [
      // {
      //   path: '',
      //   redirectTo: 'signin',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'signin',
      //   component: SigninComponent,
      // },
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
