import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PofinancetrackerComponent } from './pofinancetracker.component';

describe('PofinancetrackerComponent', () => {
  let component: PofinancetrackerComponent;
  let fixture: ComponentFixture<PofinancetrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PofinancetrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PofinancetrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
