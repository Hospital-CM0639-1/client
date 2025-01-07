import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillingInvoiceComponent } from './add-billing-invoice.component';

describe('AddBillingInvoiceComponent', () => {
  let component: AddBillingInvoiceComponent;
  let fixture: ComponentFixture<AddBillingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBillingInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBillingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
