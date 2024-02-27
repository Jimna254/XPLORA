import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTourComponent } from './create-tour.component';

describe('CreateTourComponent', () => {
  let component: CreateTourComponent;
  let fixture: ComponentFixture<CreateTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
