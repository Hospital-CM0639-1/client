import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthUserService } from "../../../services/user/auth-user.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(
      private authUserService: AuthUserService,
      private router: Router,
  ) { }

  onLogout() {
    this.authUserService.onLogout()
      .subscribe(
        () => {
          this.authUserService.removeToken();
          this.router.navigate(['/']);
        }
      )
  }
}
