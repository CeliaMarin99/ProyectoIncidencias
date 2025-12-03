import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";
import { IncidenciaService } from '../../../services/incidencia.service';
import { Incidencia } from '../../../Models/incidencia';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-client',
  imports: [NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent implements OnInit{

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getUser();

    if (user && user.id) {
      const idEmpleado = user.id;

      this.incidenciaService.findByEmpleado(idEmpleado).subscribe({
        next: (data) => {
          this.incidencias = data;
          console.log('Incidencias del empleado:', data);
        },
        error: (err) => {
          console.error('Error al cargar incidencias', err);
        }
      });
    } else {
      console.error('No se encontró usuario logueado');
    }
  }

    //metodo eliminar
    deleteIncidencia(id: number): void {

      console.log("id de la inciencia:", id);
    
      this.incidenciaService.delete(id).subscribe(() => {
        this.incidencias = this.incidencias.filter(inc => inc.id !== id);
        //refescar la pagina
        this.router.navigate(['/empleado/home']);
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

     //Abrir Modal detalles
     openEliminarModal(incidencia: Incidencia) {

        this.selectedIncidencia = JSON.parse(JSON.stringify(incidencia)); 
        console.log("Incidencia seleccionada para borrar:", incidencia);
      }

}
