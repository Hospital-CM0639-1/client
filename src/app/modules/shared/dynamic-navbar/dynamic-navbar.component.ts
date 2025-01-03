import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

export interface NavItem {
  label: string; // Display text for the link
  routerLink: string; // Router link for navigation
  icon?: string; // Optional icon class (e.g., PrimeIcons)
}

@Component({
  selector: 'app-dynamic-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './dynamic-navbar.component.html',
  styleUrl: './dynamic-navbar.component.scss'
})
export class DynamicNavbarComponent {
  @Input() navItems: NavItem[] = []; // Input property to accept navigation items
}
