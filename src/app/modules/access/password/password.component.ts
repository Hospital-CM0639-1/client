import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PasswordService } from "./password.service";
import { PASSWORD_REGEX } from "../../../shared/regexs/access/access-regex";

@Component({
  selector: 'app-password',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
    protected passwordForm!: FormGroup;
    @Input() userId !: number;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private passwordService: PasswordService,
    ) {

    }

    onChangePassword() {
        this.passwordService.onChangePassword(this.passwordForm.value).subscribe({
            next: () => {
                this.router.navigate(['/']);
            }
        });
    }

    onChangePasswordToAnotherUser() {
        this.passwordService.onChangePasswordToAnotherUser(this.passwordForm.value, this.userId).subscribe({
            next: () => {
                // redirect to user list
                this.router.navigate(['/']);
            }
        });
    }

    ngOnInit(): void {
        if (this.userId !== undefined) {
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
