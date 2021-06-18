import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationreportComponent } from './consolidationreport.component';

describe('ConsolidationreportComponent', () => {
  let component: ConsolidationreportComponent;
  let fixture: ComponentFixture<ConsolidationreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidationreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidationreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
