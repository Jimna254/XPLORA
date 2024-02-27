import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ITour } from '../../../Interfaces/tours.interface';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'app-updatetour',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './updatetour.component.html',
  styleUrl: './updatetour.component.css',
})
export class UpdatetourComponent {
  updateTourForm!: FormGroup;
  id!: string;
  tour!: ITour;
  sucessMsg!: string;

  visible = false;
  visible2 = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tourService: ToursService
  ) {
    this.updateTourForm = this.fb.group({
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      // category_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getTourId();
  }

  getTourId() {
    this.route.params.subscribe((params) => {
      this.id = params['tour_id'];
      if (this.id) {
        this.getTourDetails();
      }
    });
  }
  getTourDetails() {
    this.tourService.getOneTourDetails(this.id).subscribe({
      next: (response) => {
        console.log('response', response);
        this.tour = response.tour[0];

        this.updateTourForm.patchValue({
          title: this.tour.title,
          image: this.tour.image,
          description: this.tour.description,
          location: this.tour.location,
          price: this.tour.price,
          start_date: this.tour.start_date,
          end_date: this.tour.end_date,
        });
        console.log(this.getTourDetails);
      },
      error: (error) => console.error('Error fetching Tour details:', error),
    });
  }

  updateTour() {
    if (this.updateTourForm.valid) {
      this.tourService
        .updateTourDetails(this.id, this.updateTourForm.value)
        .subscribe({
          next: (response) => {
            if (response.message) {
              this.visible2 = true;
              this.sucessMsg = response.message;

              setTimeout(() => {
                this.visible2 = false;
              }, 3000);
            }
          },

          error: (error) => console.error('Error updating Tour:', error),
        });
    } else {
      console.error('Form is not valid');
    }
  }
}
