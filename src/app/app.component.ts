import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthUserService } from "./shared/services/user/auth-user.service";
import { SpinnerLoaderComponent } from "./shared/component/spinner-loader/spinner-loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, SpinnerLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public loading = false;
  constructor(
      private authUserService: AuthUserService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (this.authUserService.getToken() === null) {
      this.router.navigate(['/']);
      this.loading = false;
    } else {
      this.authUserService.onLogged().subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate([this.authUserService.getFirstRouteAfterAuthentication()]);
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}
