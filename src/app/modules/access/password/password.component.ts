import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PasswordService } from "./password.service";
import { PASSWORD_REGEX } from "../../../shared/regexs/access/access-regex";
import { DatePipe } from "@angular/common";
import { User } from "../../../shared/interfaces/user/user";

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
    @Input() userId : null | string = null;
    redirectTo: string | undefined;

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
        this.passwordService.onChangePassword(this.passwordForm.value).subscribe({
            next: () => {
                this.router.navigate(['/']);
            }
        });
    }

    onChangePasswordToAnotherUser() {
        this.passwordService.onChangePasswordToAnotherUser(this.passwordForm.value, <string>this.userId).subscribe({
            next: () => {
                this.router.navigate([this.redirectTo]);
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
