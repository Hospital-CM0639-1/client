import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthUserService } from "./shared/services/user/auth-user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
      private authUserService: AuthUserService,
      private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authUserService.getToken() === null) {
      this.router.navigate(['/']);
    } else {
      this.authUserService.onLogged().subscribe({
        next: () => {
          this.router.navigate([this.authUserService.getFirstRouteAfterAuthentication()]);
        }
      });
    }
  }
}
