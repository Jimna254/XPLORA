import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  title = 'Join Us Today';
  sucessMsg!: string;
  errorMsg!: string;
  registerForm!: FormGroup;

  visible1 = false;
  visible2 = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  registerUser() {
    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      console.log(res);
      if (res.message) {
        this.visible1 = true;
        this.sucessMsg = res.message;

        this.router.navigate(['login']);
        setTimeout(() => {
          this.visible1 = false;
        }, 3000);
      } else if (res.messageerror) {
        this.visible2 = true;
        this.errorMsg = res.messageerror;
        setTimeout(() => {
          this.visible2 = false;
        }, 3000);
      }
    });
  }
}
