import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { User, updateUser } from '../../../Interfaces/users.interface'; // Assuming it's correctly named now

@Component({
  selector: 'app-updateusercomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdateusercomponentComponent {
  updateUserForm!: FormGroup;
  id!: string;
  user!: updateUser;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.getUserId();

    this.updateUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getUserId() {
    this.route.params.subscribe((params) => {
      console.log(params['user_id']);
      this.id = params['user_id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.api.getOneUserDetails(this.id).subscribe((response) => {
      console.log(response);
      this.user = response.user[0];

      this.updateUserForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone_number: this.user.phone_number,
      });
    });
  }

  updateUser() {
    this.api
      .updateUserDetails(this.id, this.updateUserForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
