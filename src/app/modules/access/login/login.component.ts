import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private loginService: LoginService,
  ) {
    this.loginForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
    });
  }

  login() {
    this.loginService.onLogin(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/doctor']);
      }
    });

    // todo: redirect based on user
  }

  ngOnInit(): void {

  }
}
