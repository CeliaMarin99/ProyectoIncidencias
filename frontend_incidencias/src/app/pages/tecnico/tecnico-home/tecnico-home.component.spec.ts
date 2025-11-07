import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoHomeComponent } from './tecnico-home.component';

describe('TecnicoHomeComponent', () => {
  let component: TecnicoHomeComponent;
  let fixture: ComponentFixture<TecnicoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
