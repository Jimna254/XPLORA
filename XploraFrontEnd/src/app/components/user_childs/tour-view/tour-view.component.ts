import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToursService } from '../../../services/tours.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css'],
})
export class TourViewComponent implements OnInit {
  toursArr: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  paginatedTours: any[] = [];
  errorMsg!: string;
  sucessMsg!: string;

  visible = false;
  visible2 = false;

  constructor(
    private toursService: ToursService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.fetchTours();
  }
  maxPage(): number {
    return Math.ceil(this.toursArr.length / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.maxPage() }, (_, index) => index + 1);
  }

  fetchTours() {
    this.toursService.getTours().subscribe({
      next: (res) => {
        if (res.error) {
          console.error(res.error);
        } else {
          this.toursArr = res.Tours;
          this.updatePaginatedTours();
        }
      },
      error: (err) => console.error(err),
    });
  }

  updatePaginatedTours() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTours = this.toursArr.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedTours();
  }
  onBookNow(tourId: string) {
    if (!tourId) {
      console.error('Tour ID is undefined.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.authService.readToken(token).subscribe({
      next: (decodedToken) => {
        const userId = decodedToken.info.user_id;
        if (!userId) {
          console.error('User ID is not available');
          return;
        }

        const bookingDetails = {
          user_id: userId,
          tour_id: tourId,
        };

        this.authService.createBooking(bookingDetails).subscribe({
          next: (response) => {
            if (response.errormessage) {
              this.visible = true;
              this.errorMsg = response.errormessage;

              setTimeout(() => {
                this.visible = false;
              }, 3000);
            } else if (response.message) {
              this.visible2 = true;
              this.sucessMsg = response.message;

              setTimeout(() => {
                this.visible2 = false;
              }, 3000);
            }
          },
          error: (error) => {
            console.error('Error creating booking', error);
          },
        });
      },
      error: (err) => {
        console.error('Error decoding token:', err);
      },
    });
  }
}
