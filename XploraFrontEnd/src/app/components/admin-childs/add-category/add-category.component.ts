import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.createCategory();
  }

  createCategory(): void {
    if (this.categoryForm.valid) {
      this.authService.createCategory(this.categoryForm.value).subscribe({
        next: (categoryResponse) => {
          console.log(categoryResponse);
        },
        error: (error) => {
          console.error('Category creation failed', error);
        },
      });
    } else {
      console.error('Category form is invalid');
    }
  }
}
