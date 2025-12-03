import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { IncidenciaService } from '../../../services/incidencia.service';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { Incidencia } from '../../../Models/incidencia';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tecnico-home',
  imports: [NavbarComponent, NgFor, FormsModule, RouterLink, CommonModule],
  templateUrl: './tecnico-home.component.html',
  styleUrl: './tecnico-home.component.css'
})
export class TecnicoHomeComponent implements OnInit {

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
    const user = this.loginService.getUser();
    const id = user.id;

    if (user && user.id) {
      this.obtenerIncidenciasTecnico(id);
    } else {
      console.error('No se encontró usuario logueado'); 
    } 
  }

  obtenerIncidenciasTecnico(id: number): void {
    this.incidenciaService.findbyTecnico(id).subscribe({
      next: (data) => {
        this.incidencias = data;
        console.log("Incidencias del técnico: ", this.incidencias);
      },
      error: (err) => {
        console.log("Error al recuperar las incidencias del técnico: ", err);
      } 
    });
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

     //Abrir Modal detalles
     openDetallesModal(incidencia: Incidencia) {
        this.selectedIncidencia = JSON.parse(JSON.stringify(incidencia)); 
      }


  }

  

