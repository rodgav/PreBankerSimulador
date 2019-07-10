import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoTransaccionComponent } from './consolidado-transaccion.component';

describe('ConsolidadoTransaccionComponent', () => {
  let component: ConsolidadoTransaccionComponent;
  let fixture: ComponentFixture<ConsolidadoTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
