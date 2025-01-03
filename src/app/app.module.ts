import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],

  imports: [BrowserModule, ButtonModule, ReactiveFormsModule, HttpClientModule, FormsModule, BrowserAnimationsModule],

  providers: [],

  bootstrap: [],
})
export class AppModule {}
