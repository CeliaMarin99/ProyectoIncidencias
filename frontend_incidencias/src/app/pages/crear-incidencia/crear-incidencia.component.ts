import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { IncidenciaService } from '../../services/incidencia.service';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Incidencia } from '../../Models/incidencia';


@Component({
  selector: 'app-crear-incidencia',
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './crear-incidencia.component.html',
  styleUrl: './crear-incidencia.component.css'
})
export class CrearIncidenciaComponent implements OnInit{

  incidencia = {
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

  selectedFile!: File;

   constructor(
    private incidenciaService: IncidenciaService,
    private loginService: LoginService,
    private router: Router
  ) {}

    ngOnInit(): void {
    // Obtener el usuario actual del localStorage
    const user = this.loginService.getUser();
    if (user && user.id) {
      this.incidencia.empleado.id = user.id;
    } 
  }

  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  }

  crearIncidencia(): void {

    this.incidencia.estado = 'Sin Empezar';

    const formData = new FormData();
    formData.append("incidencia", new Blob([JSON.stringify(this.incidencia)], { type: "application/json" }));

    if(this.selectedFile){
      formData.append("file", this.selectedFile);
    }

    this.incidenciaService.reportarIncidencia(formData).subscribe({
      next: (res) => {
        console.log("Incidencia creada", res);
        this.router.navigate(['/empleado/home']);
      },
      error: err => console.log("Error", err)
    });
  }
}


