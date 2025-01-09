import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoginComponent
  ]
})
export class AccessModule { }
