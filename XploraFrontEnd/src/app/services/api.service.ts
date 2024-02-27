import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userResponse } from '../Interfaces/userResponse.interface';
import { updateUser, users } from '../Interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<{ users: userResponse[]; error: string }>(
      'http://localhost:3001/users',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
  deleteUser(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3001/users/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  getOneUserDetails(id: string) {
    return this.http.get<{ user: users[] }>(
      `http://localhost:3001/users/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  updateUserDetails(id: string, details: updateUser) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3001/users/update/${id}`,
      details,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
}
