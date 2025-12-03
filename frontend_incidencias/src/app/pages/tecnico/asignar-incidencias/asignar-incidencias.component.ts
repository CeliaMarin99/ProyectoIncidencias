import { Component } from '@angular/core';
import { IncidenciaService } from '../../../services/incidencia.service';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { Incidencia } from '../../../Models/incidencia';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';

@Component({
  selector: 'app-asignar-incidencias',
  imports: [NgFor, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './asignar-incidencias.component.html',
  styleUrl: './asignar-incidencias.component.css'
})
export class AsignarIncidenciasComponent {
  incidencias: Incidencia[] = [];

  palabraClave: string = '';

   selectedIncidencia: Incidencia = {
    titulo: '',
    prioridad: '',
    estado: '',
    lugar: '',
    categoria: '',
    detalles: '',
    photo: '',
    fecha: '',
    empleado: { id: 0 }  // ← se rellena automáticamente con el usuario logeado
  };

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

  //Abrir Modal detalles
     openDetallesModal(incidencia: Incidencia) {
        this.selectedIncidencia = JSON.parse(JSON.stringify(incidencia)); 
      }

    //metodo buscar incidencia
    buscarIncidencia(palabraClave: string): void {
      this.incidenciaService.buscarIncidencia(palabraClave).subscribe({
        next: (data) => {
          this.incidencias = data;
          console.log('Incidencias encontradas:', data);
        },
        error: (err) => {
          console.error('Error al buscar incidencias', err);
        }
      });
    }
}
