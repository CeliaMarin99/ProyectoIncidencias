import { Component } from '@angular/core';
import { IncidenciaService } from '../../../services/incidencia.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { Incidencia } from '../../../Models/incidencia';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-asignar-incidencias',
  imports: [NgFor],
  templateUrl: './asignar-incidencias.component.html',
  styleUrl: './asignar-incidencias.component.scss'
})
export class AsignarIncidenciasComponent {
  incidencias: Incidencia[] = [];

  constructor(
    private incidenciaService: IncidenciaService,
    private loginService: LoginService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.obtenerIncidenciasTecnico();
  }

  //metodo para recuperar todas las incidencias del tecnico
  obtenerIncidenciasTecnico(): void {
    this.incidenciaService.findUnassignedIncidencias().subscribe({
      next: (data) => {
        this.incidencias = data;
        console.log("Incidencias sin técnico: ", this.incidencias);
      },
      error: (err) => {
        console.log("Error al recuperar las incidencias sin técnico: ", err);
      } 
    });

  }
}
