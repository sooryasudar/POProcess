import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2ptrackerComponent } from './p2ptracker.component';

describe('P2ptrackerComponent', () => {
  let component: P2ptrackerComponent;
  let fixture: ComponentFixture<P2ptrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2ptrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2ptrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
