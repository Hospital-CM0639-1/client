import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoginComponent,
    ButtonModule
  ]
})
export class AccessModule { }
