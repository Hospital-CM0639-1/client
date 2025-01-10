import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PasswordService } from "./password.service";
import { PASSWORD_REGEX } from "../../../shared/regexs/access/access-regex";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-password',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        PasswordModule,
        CardModule,
        ProgressSpinnerModule
    ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
    protected passwordForm!: FormGroup;
    @Input() userId : null | string = null;
    redirectTo: string | undefined;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private passwordService: PasswordService,
    ) {

        this.redirectTo = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.userId = params.get('userId');

            if (this.userId) {
                this.passwordForm = this.fb.group(
                    {
                        newPassword: ['', [Validators.pattern(PASSWORD_REGEX)]],
                        repeatedPassword: ['', [Validators.pattern(PASSWORD_REGEX)]],
                    },
                    { validators: () => PasswordComponent.newPasswordEqualsToRepeated }
                );
            } else {
                this.passwordForm = this.fb.group(
                    {
                        newPassword: ['', [Validators.pattern(PASSWORD_REGEX)]],
                        repeatedPassword: ['', [Validators.pattern(PASSWORD_REGEX)]],
                        oldPassword: ['', [Validators.required]],
                    },
                    { validators: () => PasswordComponent.newPasswordEqualsToRepeated }
                );
            }
        });
    }

    onChangePassword() {
        this.loading = true;
        this.passwordService.onChangePassword(this.passwordForm.value).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    onChangePasswordToAnotherUser() {
        this.loading = true;
        this.passwordService.onChangePasswordToAnotherUser(this.passwordForm.value, <string>this.userId).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate([this.redirectTo]);
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    protected static newPasswordEqualsToRepeated(control: AbstractControl) {
        let newPassword = control.get('newPassword');
        let repeatedPassword = control.get('repeatedPassword');
        if(!newPassword || !repeatedPassword || newPassword.value !== repeatedPassword.value){
            return { notEqual: true };
        }
        return null;
    }
}
