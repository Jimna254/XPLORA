import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
  toursArr: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  paginatedTours: any[] = [];

  constructor(private toursService: ToursService) {}

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
  deleteTour(id: string) {
    this.toursService.deleteTour(id).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchTours();
      },
      error: (err) => console.error(err),
    });
  }
}
