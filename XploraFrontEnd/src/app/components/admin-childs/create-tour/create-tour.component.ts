import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.css',
})
export class CreateTourComponent {
  tourForm!: FormGroup;
  categoriesArr: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categories: CategoryService,
    private authService: AuthService
  ) {
    this.tourForm = this.fb.group({
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],

      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.fetchCategories();
  }
  onSubmit(): void {
    this.createTour();
  }

  createTour(): void {
    if (this.tourForm.valid) {
      this.authService.createTour(this.tourForm.value).subscribe({
        next: (toursResponse) => {
          console.log(toursResponse);
        },
        error: (error) => {
          console.error('Tour creation failed', error);
        },
      });
    } else {
      console.error('Tour form is invalid');
    }
  }

  fetchCategories() {
    this.categories.getCategories().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.Categories) {
        console.log(res.Categories);
        this.categoriesArr = res.Categories;
      }
    });

    console.log(this.categories);
  }
}
