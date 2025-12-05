import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIncidenciasComponent } from './dashboard-incidencias.component';

describe('DashboardIncidenciasComponent', () => {
  let component: DashboardIncidenciasComponent;
  let fixture: ComponentFixture<DashboardIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIncidenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
