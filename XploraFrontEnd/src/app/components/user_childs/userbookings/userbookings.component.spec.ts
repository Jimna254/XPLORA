import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookingsComponent } from './userbookings.component';

describe('UserbookingsComponent', () => {
  let component: UserbookingsComponent;
  let fixture: ComponentFixture<UserbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
