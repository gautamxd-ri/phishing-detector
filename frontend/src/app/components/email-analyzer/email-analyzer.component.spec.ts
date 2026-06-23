import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAnalyzerComponent } from './email-analyzer.component';

describe('EmailAnalyzerComponent', () => {
  let component: EmailAnalyzerComponent;
  let fixture: ComponentFixture<EmailAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAnalyzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
