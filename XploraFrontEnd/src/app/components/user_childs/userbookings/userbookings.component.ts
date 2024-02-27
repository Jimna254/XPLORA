import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookingserviceService } from '../../../services/bookingservice.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './userbookings.component.html',
  styleUrl: './userbookings.component.css',
})
export class UserbookingsComponent {
  bookingsArr: any[] = [];
  userbookingsArr: any[] = [];

  constructor(private bookings: BookingserviceService) {
    this.fetchUserBookings();
    console.log('here');
    
  }

  user_id!: string;
  fetchUserBookings() {
    this.bookings.getUserBookings(this.user_id).subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.bookings) {
        console.log(res.bookings);
        this.userbookingsArr = res.bookings;
      }
    });

    console.log(this.bookings);
  }

  cancelBooking(id: string) {
    this.bookings.cancelBooking(id).subscribe((res) => {
      console.log(res);
      this.fetchUserBookings();
    });
  }
}
