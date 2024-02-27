import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toursResponse } from '../Interfaces/tours.interface';
import { ITour } from '../Interfaces/tours.interface';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}
  getTours() {
    return this.http.get<toursResponse>('http://localhost:3001/tours', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: this.token,
      }),
    });
  }

  deleteTour(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3001/tours/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  getOneTourDetails(id: string) {
    return this.http.get<{ tour: ITour[] }>(
      `http://localhost:3001/tours/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  updateTourDetails(id: string, details: ITour) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3001/tours/update/${id}`,
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
