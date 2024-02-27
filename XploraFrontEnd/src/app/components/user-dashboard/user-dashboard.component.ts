import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from '../user_childs/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, UserSidebarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {}
