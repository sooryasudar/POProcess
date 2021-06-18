import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationdocuploadComponent } from './consolidationdocupload.component';

describe('ConsolidationdocuploadComponent', () => {
  let component: ConsolidationdocuploadComponent;
  let fixture: ComponentFixture<ConsolidationdocuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidationdocuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidationdocuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
