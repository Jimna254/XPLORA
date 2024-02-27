import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetourComponent } from './updatetour.component';

describe('UpdatetourComponent', () => {
  let component: UpdatetourComponent;
  let fixture: ComponentFixture<UpdatetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatetourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
