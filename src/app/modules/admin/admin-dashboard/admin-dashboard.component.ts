import { Component } from '@angular/core';
import { LogoutComponent } from "../../../shared/component/access/logout/logout.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    LogoutComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
