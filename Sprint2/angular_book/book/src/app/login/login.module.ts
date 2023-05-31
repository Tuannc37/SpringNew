import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";
import {VerityResetPasswordComponent} from "./verity-reset-password/verity-reset-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";


@NgModule({
  declarations: [
    LoginComponent,
    VerityResetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class LoginModule { }
