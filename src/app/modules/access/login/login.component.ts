import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthUserService } from "../../../shared/services/user/auth-user.service";
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    CardModule,
    FloatLabelModule,
    ToastModule,
    PasswordModule,
    SpinnerLoaderComponent
],
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected loading = false; // Controls the loading state

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authUserService: AuthUserService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true; // Show loader

    this.authUserService.onLogin(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate([this.authUserService.getFirstRouteAfterAuthentication()]);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Access Denied', detail: '' });
        this.loading = false; // Hide loader on error
      },
      complete: () => {
        this.loading = false; // Hide loader on completion
      },
    });
  }
}