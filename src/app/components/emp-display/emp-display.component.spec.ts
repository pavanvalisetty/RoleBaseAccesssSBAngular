import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDisplayComponent } from './emp-display.component';

describe('EmpDisplayComponent', () => {
  let component: EmpDisplayComponent;
  let fixture: ComponentFixture<EmpDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpDisplayComponent]
    });
    fixture = TestBed.createComponent(EmpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
