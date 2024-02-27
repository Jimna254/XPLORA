import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'], // Corrected property name and made it an array
})
export class UsersComponent {
  usersArr: any[] = [];

  constructor(private api: ApiService) {
    this.fetchUsers();
  }

  fetchUsers() {
    this.api.getUsers().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.users) {
        console.log(res.users);
        this.usersArr = res.users;
      }
    });
  }

  deleteUser(id: string) {
    this.api.deleteUser(id).subscribe((res) => {
      console.log(res);

      this.fetchUsers();
    });
  }
}
