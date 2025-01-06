import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LogoutComponent } from "../../../shared/component/logout/logout.component";

@Component({
  selector: 'app-secretary-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoutComponent,
    RouterLink
  ],
  templateUrl: './secretary-dashboard.component.html',
  styleUrl: './secretary-dashboard.component.scss'
})
export class SecretaryDashboardComponent {

}
