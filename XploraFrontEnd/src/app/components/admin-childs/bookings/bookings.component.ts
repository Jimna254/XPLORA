import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookingserviceService } from '../../../services/bookingservice.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  bookingsArr: any[] = [];
  userbookingsArr: any[] = [];

  constructor(private bookings: BookingserviceService) {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookings.getBookings().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.Bookings) {
        console.log(res.Bookings);
        this.bookingsArr = res.Bookings;
      }
    });

    console.log(this.bookings);
  }
  user_id!: string;
  fetchUserBookings() {
    this.bookings.getUserBookings(this.user_id).subscribe((res) => {
      console.log(res);
    });
  }

  deleteBooking(id: string) {
    this.bookings.deleteBooking(id).subscribe((res) => {
      console.log(res);
      this.fetchBookings();
    });
  }
}
