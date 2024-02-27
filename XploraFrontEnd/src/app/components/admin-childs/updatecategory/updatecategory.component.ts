import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { updateCategory } from '../../../Interfaces/category.interface'; // Ensure this import path is correct

@Component({
  selector: 'app-updatecategory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css'], // Corrected from styleUrl to styleUrls and made it an array
})
export class UpdatecategoryComponent {
  updateCategoryForm!: FormGroup;
  id!: string;
  category!: updateCategory;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService // Ensure consistency in naming convention (categoryservice to categoryService)
  ) {
    this.updateCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(6)]], // Ensure validators match your requirements
    });

    this.getCategoryId();
  }

  getCategoryId() {
    this.route.params.subscribe((params) => {
      console.log(params['category_id']);
      this.id = params['category_id'];
      this.getCategoryDetails();
    });
  }

  getCategoryDetails() {
    this.categoryService.getOneCategoryDetails(this.id).subscribe({
      next: (response) => {
        console.log(response);
        this.category = response.category[0];

        this.updateCategoryForm.patchValue({
          name: this.category.name,
          description: this.category.description,
        });
      },
      error: (error) =>
        console.error('Error fetching category details:', error),
    });
  }

  updateCategory() {
    if (this.updateCategoryForm.valid) {
      this.categoryService
        .updateCategoryDetails(this.id, this.updateCategoryForm.value)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.error('Error updating category:', error),
        });
    } else {
      console.error('Form is not valid');
    }
  }
}
