import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtornoComponent } from './extorno.component';

describe('ExtornoComponent', () => {
  let component: ExtornoComponent;
  let fixture: ComponentFixture<ExtornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
