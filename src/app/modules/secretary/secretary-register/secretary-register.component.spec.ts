import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryRegisterComponent } from './secretary-register.component';

describe('SecretaryRegisterComponent', () => {
  let component: SecretaryRegisterComponent;
  let fixture: ComponentFixture<SecretaryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretaryRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
