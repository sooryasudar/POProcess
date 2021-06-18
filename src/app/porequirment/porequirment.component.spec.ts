import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorequirmentComponent } from './porequirment.component';

describe('PorequirmentComponent', () => {
  let component: PorequirmentComponent;
  let fixture: ComponentFixture<PorequirmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorequirmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorequirmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
