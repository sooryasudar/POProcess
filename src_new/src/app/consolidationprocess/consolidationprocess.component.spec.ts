import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationprocessComponent } from './consolidationprocess.component';

describe('ConsolidationprocessComponent', () => {
  let component: ConsolidationprocessComponent;
  let fixture: ComponentFixture<ConsolidationprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidationprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidationprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
