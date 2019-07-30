import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
const routes: Routes = [
  {
    path: 'login',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'configuration',
    loadChildren: './modules/configuration/configuration.module#ConfigurationModule',
  },
  {
    path: '**', 
    pathMatch: 'full', 
    redirectTo: 'configuration/home-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
