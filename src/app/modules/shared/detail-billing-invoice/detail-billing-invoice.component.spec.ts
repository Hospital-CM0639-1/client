import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBillingInvoiceComponent } from './detail-billing-invoice.component';

describe('DetailBillingInvoiceComponent', () => {
  let component: DetailBillingInvoiceComponent;
  let fixture: ComponentFixture<DetailBillingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBillingInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBillingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
