import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateBookComponent} from "../management-book/create-book/create-book.component";
import {LoginComponent} from "./login.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {VerityResetPasswordComponent} from "./verity-reset-password/verity-reset-password.component";
import {UserCreatComponent} from "../info/user-creat/user-creat.component";
import {AuthGuard} from "./auth.guard.";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
  , {
    path: 'reset-password',
    component: ResetPasswordComponent
  }, {
    path: 'verify-reset-password/:name',
    component: VerityResetPasswordComponent
  },

  {
    path: 'create-user',
    component: UserCreatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
