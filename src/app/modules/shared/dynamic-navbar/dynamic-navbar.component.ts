import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AuthUserService } from '../../../shared/services/user/auth-user.service';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";

export interface NavItem {
  label: string; // Display text for the link
  routerLink?: string; // Router link for navigation
  icon?: string; // Optional icon class (e.g., PrimeIcons)
  command?: () => void;
}

@Component({
  selector: 'app-dynamic-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, ProgressSpinnerModule, SpinnerLoaderComponent],
  templateUrl: './dynamic-navbar.component.html',
  styleUrl: './dynamic-navbar.component.scss'
})
export class DynamicNavbarComponent {
  public loading = false;
  constructor(private authUserService: AuthUserService, private router: Router) {}

  @Input() navItems: NavItem[] = []; // Input property to accept navigation items


  logout() {
    this.loading = true;
    this.authUserService.onLogout()
    .subscribe(
      () => {
        this.authUserService.removeToken();
        this.loading = false;
        this.router.navigate(['/']);
      },
      () => {this.loading = false;}
    )
  }

}
