import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthUserService } from "../../../shared/services/user/auth-user.service";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authUserService: AuthUserService,
  ) {

  }

  onLogin() {
    this.authUserService.onLogin(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate([this.authUserService.getFirstRouteAfterAuthentication()]);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
    });
  }
}
