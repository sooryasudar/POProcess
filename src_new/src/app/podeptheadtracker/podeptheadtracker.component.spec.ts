import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodeptheadtrackerComponent } from './podeptheadtracker.component';

describe('PodeptheadtrackerComponent', () => {
  let component: PodeptheadtrackerComponent;
  let fixture: ComponentFixture<PodeptheadtrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodeptheadtrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodeptheadtrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
