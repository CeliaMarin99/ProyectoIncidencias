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
    this.obtenerIncidenciasNoAsignadas();
  }

  //metodo para obtener las incidencias no asignadas
  obtenerIncidenciasNoAsignadas(): void {
    this.incidenciaService.findUnassignedIncidencias().subscribe({
      next: (data) => {
        this.incidencias = data;
        console.log("Incidencias no asignadas: ", this.incidencias);
      },
      error: (err) => {
        console.log("Error al recuperar las incidencias no asignadas: ", err);
      } 
    });
  }

  //metodo para asignar una incidencia al tecnico logueado
  asignarIncidencia(idIncidencia: number): void {
    const user = this.loginService.getUser();
    const idTecnico = user.id;
    this.incidenciaService.asignarTecnico(idIncidencia, idTecnico).subscribe({
      next: (data) => {
        console.log("Incidencia asignada correctamente: ", data);
        this.obtenerIncidenciasNoAsignadas(); // Actualizar la lista después de asignar
      },
      error: (err) => {
        console.log("Error al asignar la incidencia: ", err);
      } 
    });
  }
}
