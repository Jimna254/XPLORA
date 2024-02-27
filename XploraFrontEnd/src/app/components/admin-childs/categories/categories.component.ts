import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoriesArr: any[] = [];

  constructor(private categories: CategoryService) {
    this.fetchCategories();
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

  deleteCategory(id: string) {
    this.categories.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.fetchCategories();
    });
  }
}
