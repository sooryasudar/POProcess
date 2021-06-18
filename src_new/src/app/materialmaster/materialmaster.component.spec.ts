import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialmasterComponent } from './materialmaster.component';

describe('MaterialmasterComponent', () => {
  let component: MaterialmasterComponent;
  let fixture: ComponentFixture<MaterialmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
