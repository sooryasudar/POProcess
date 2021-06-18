import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallprfComponent } from './overallprf.component';

describe('OverallprfComponent', () => {
  let component: OverallprfComponent;
  let fixture: ComponentFixture<OverallprfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallprfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallprfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
