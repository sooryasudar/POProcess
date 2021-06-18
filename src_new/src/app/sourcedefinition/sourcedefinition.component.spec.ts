import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcedefinitionComponent } from './sourcedefinition.component';

describe('SourcedefinitionComponent', () => {
  let component: SourcedefinitionComponent;
  let fixture: ComponentFixture<SourcedefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcedefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcedefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
