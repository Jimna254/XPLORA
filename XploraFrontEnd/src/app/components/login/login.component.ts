import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { loginDetails } from '../../Interfaces/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title = 'Login Here';
  errorMsg!: string;
  sucessMsg!: string;

  visible = false;
  visible2 = false;

  constructor(private router: Router, private authService: AuthService) {}
  login(details: loginDetails) {
    console.log('Login details: ' + JSON.stringify(details));

    this.authService.loginUser(details).subscribe((res) => {
      if (res.error) {
        this.visible = true;
        this.errorMsg = res.error;

        setTimeout(() => {
          this.visible = false;
        }, 3000);
      } else if (res.message) {
        this.visible2 = true;
        this.sucessMsg = res.message;

        localStorage.setItem('token', res.token);

        this.authService.readToken(res.token).subscribe((res) => {
          setTimeout(() => {
            this.visible2 = false;

            if (res.info && res.info.role) {
              if (res.info.role == 'admin') {
                this.router.navigate(['admin/tours']);
              } else if (res.info.role == 'user') {
                this.router.navigate(['user/tour-view']);
              }
            } else {
              console.log('Role information not available');
            }
          }, 2000);
        });
      }
    });
  }
}
