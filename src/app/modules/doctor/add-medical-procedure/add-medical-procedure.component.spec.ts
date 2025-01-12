import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalProcedureComponent } from './add-medical-procedure.component';

describe('AddMedicalProcedureComponent', () => {
  let component: AddMedicalProcedureComponent;
  let fixture: ComponentFixture<AddMedicalProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicalProcedureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMedicalProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
