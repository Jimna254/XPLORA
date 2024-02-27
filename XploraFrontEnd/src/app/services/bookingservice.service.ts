// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root',
// })
// export class BookingserviceService {
//   constructor() {}
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  bookingDetails,
  bookingResponse,
  userbookingResponse,
} from '../Interfaces/booking.interface';
import { categoriesResponse } from '../Interfaces/categoryResponse';

@Injectable({
  providedIn: 'root',
})
export class BookingserviceService {
  constructor(private http: HttpClient) {}

  getUserBookings(user_id: string) {
    const token = localStorage.getItem('token') as string;
    return this.http.get<userbookingResponse>(
      `http://localhost:3001/bookings/userbookings/${user_id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }

  getBookings() {
    let token = localStorage.getItem('token') as string;
    return this.http.get<bookingResponse>('http://localhost:3001/bookings', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    });
  }

  cancelBooking(id: string) {
    let token = localStorage.getItem('token') as string;
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3001/bookings/cancel/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }

  deleteBooking(id: string) {
    let token = localStorage.getItem('token') as string;
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3001/bookings/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }

  getOneBookingDetails(id: string) {
    let token = localStorage.getItem('token') as string;

    return this.http.get<{ booking: bookingDetails[] }>(
      `http://localhost:3001/bookings/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token,
        }),
      }
    );
  }

  updateBookingDetails(id: string, details: bookingDetails) {
    let token = localStorage.getItem('token') as string;

    return this.http.put<{ message: string; error?: string }>(
      `http://localhost:3001/bookings/update/${id}`,
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
