import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlCheckerComponent } from './url-checker.component';

describe('UrlCheckerComponent', () => {
  let component: UrlCheckerComponent;
  let fixture: ComponentFixture<UrlCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
