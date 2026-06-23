import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsScannerComponent } from './sms-scanner.component';

describe('SmsScannerComponent', () => {
  let component: SmsScannerComponent;
  let fixture: ComponentFixture<SmsScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
