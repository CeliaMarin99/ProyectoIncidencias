import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonMensajesComponent } from './buzon-mensajes.component';

describe('BuzonMensajesComponent', () => {
  let component: BuzonMensajesComponent;
  let fixture: ComponentFixture<BuzonMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuzonMensajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuzonMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
