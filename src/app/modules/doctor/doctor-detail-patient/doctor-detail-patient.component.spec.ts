import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailPatientComponent } from './doctor-detail-patient.component';

describe('DoctorDetailPatientComponent', () => {
  let component: DoctorDetailPatientComponent;
  let fixture: ComponentFixture<DoctorDetailPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDetailPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorDetailPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
