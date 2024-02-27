import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminsidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css',
})
export class AdminsidebarComponent {}
