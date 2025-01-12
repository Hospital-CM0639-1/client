import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientVitalComponent } from './add-patient-vital.component';

describe('AddPatientVitalComponent', () => {
  let component: AddPatientVitalComponent;
  let fixture: ComponentFixture<AddPatientVitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPatientVitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPatientVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
