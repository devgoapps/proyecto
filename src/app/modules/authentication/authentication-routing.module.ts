import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      FormsModule
    ],
    exports: [
      RouterModule
    ]
})
export class AuthenticationRoutingModule { }