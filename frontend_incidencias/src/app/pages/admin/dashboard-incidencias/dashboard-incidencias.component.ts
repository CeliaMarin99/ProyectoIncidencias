import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { IncidenciaService } from '../../../services/incidencia.service';
import { Usuario } from '../../../Models/usuario';
import { Incidencia } from '../../../Models/incidencia';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-incidencias',
  imports: [RouterLink, CommonModule, NgFor, FormsModule],
  templateUrl: './dashboard-incidencias.component.html',
  styleUrl: './dashboard-incidencias.component.css'
})
export class DashboardIncidenciasComponent implements OnInit{

    usuarioActual!: Usuario;

    incidencias: Incidencia[] = [];

    rol: string = "";

    selectedIncidencia = {
      id:0,
      titulo: '',
      prioridad: '',
      estado: '',
      lugar: '',
      categoria: '',
      detalles: '',
      photo: '',
      fecha: '',
      empleado: { id: 0, username: "" },
      tecnico: { id: 0, username: "" } 
  };

   palabraClave: string = '';

  // Paginación
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(
    private login: LoginService,
    private incidenciaServ: IncidenciaService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.ObtenerTodasLasIncidencias();
    this.usuarioActual = this.login.getUser();

    this.rol = this.login.getUserRole();
  }

  ObtenerTodasLasIncidencias():void{
    this.incidenciaServ.findAll().subscribe({
      next: (data) => {
        this.incidencias = data;

        // Calcular total de páginas
        this.totalPages = Math.ceil(this.incidencias.length / this.pageSize);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err) => {
        console.error('Error al cargar incidencias', err);
      }
    });

  }

  
  editarIncidencia(): void {
    this.incidenciaServ.editarIncidencia(this.selectedIncidencia)
      .subscribe(() => {

        console.log("Incidencia editada: ",this.selectedIncidencia);
      });
  }

   //metodo eliminar
    deleteIncidencia(): void {
      const id = this.selectedIncidencia.id;
      this.incidenciaServ.delete(id).subscribe(() => {
        this.incidencias = this.incidencias.filter(inc => inc.id !== id);
        alert("Incidencia eliminada correctamente");
        this.ObtenerTodasLasIncidencias(); // refrescar tabla
      }); 
    }

   //Abrir modal con usuario cargado
  openEditModal(incidencia: Incidencia) {
    this.selectedIncidencia = JSON.parse(JSON.stringify(incidencia)); 
  }

   openDeleteModal(incidencia: Incidencia) {
    this.selectedIncidencia = JSON.parse(JSON.stringify(incidencia)); 
  }

  //metodo buscar incidencia
    buscarIncidencia(): void {

      this.incidenciaServ.buscarIncidencia(this.palabraClave).subscribe({
        next: (data) => {
          this.incidencias = data;
          console.log('Incidencias encontradas:', data);
          console.log('Búsqueda:', this.palabraClave);

        },
        error: (err) => {
          console.error('Error al buscar incidencias', err);
        }
      });
    }


  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  //cerrar sesion
  public logout(){
    this.login.logout();
    this.router.navigate(['']);
  }

}
