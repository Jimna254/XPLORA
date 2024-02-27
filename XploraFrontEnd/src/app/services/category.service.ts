import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CategoryDetails,
  updateCategory,
} from '../Interfaces/category.interface';
import { categoriesResponse } from '../Interfaces/categoryResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories() {
    let token = localStorage.getItem('token') as string;
    return this.http.get<categoriesResponse>('http://localhost:3001/category', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    });
  }

  deleteCategory(id: string) {
    let token = localStorage.getItem('token') as string;
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3001/category/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }

  getOneCategoryDetails(id: string) {
    let token = localStorage.getItem('token') as string;

    return this.http.get<{ category: CategoryDetails[] }>(
      `http://localhost:3001/category/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }

  updateCategoryDetails(id: string, details: updateCategory) {
    let token = localStorage.getItem('token') as string;

    return this.http.put<{ message: string; error?: string }>(
      `http://localhost:3001/category/update/${id}`,
      details,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }
}
