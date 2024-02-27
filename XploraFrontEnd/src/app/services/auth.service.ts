import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails } from '../Interfaces/login.interface';
import { RegisterDetails } from '../Interfaces/register.interface';
import { CategoryDetails } from '../Interfaces/category.interface';
import { ITour } from '../Interfaces/tours.interface';
import { bookingDetails } from '../Interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(register_details: RegisterDetails) {
    return this.http.post<{
      message: string;
      error: string;
      messageerror: string;
    }>('http://localhost:3001/users', register_details);
  }

  loginUser(user_details: loginDetails) {
    return this.http.post<{ message: string; token: string; error: string }>(
      'http://localhost:3001/users/login',
      user_details
    );
  }

  createCategory(category_details: CategoryDetails) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3001/category',
      category_details
    );
  }
  createTour(tour: ITour) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3001/tours',
      tour
    );
  }
  createBooking(booking: bookingDetails) {
    return this.http.post<{
      message: string;
      error: string;
      errormessage: string;
    }>('http://localhost:3001/bookings', booking);
  }
  readToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    };
    return this.http.post<{
      info: { user_id: string; name: string; email: string; role: string };
    }>('http://localhost:3001/users/checkdetails', {}, httpOptions);
  }
}
