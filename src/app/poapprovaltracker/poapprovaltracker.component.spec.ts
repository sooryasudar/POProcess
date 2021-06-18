import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoapprovaltrackerComponent } from './poapprovaltracker.component';

describe('PoapprovaltrackerComponent', () => {
  let component: PoapprovaltrackerComponent;
  let fixture: ComponentFixture<PoapprovaltrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoapprovaltrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoapprovaltrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
