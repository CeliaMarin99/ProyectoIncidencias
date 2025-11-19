import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { IncidenciaService } from '../../services/incidencia.service';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-incidencia',
  imports: [NavbarComponent, FormsModule],
  templateUrl: './crear-incidencia.component.html',
  styleUrl: './crear-incidencia.component.scss'
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

  crearIncidencia(): void {
    
    console.log('Datos a enviar:', this.incidencia);

    this.incidenciaService.reportarIncidencia(this.incidencia).subscribe({
      next: (response) => {
        console.log('Incidencia creada:', response);
        this.router.navigate(['/user/home']);
      },
      error: (err) => {
        console.error('Error al crear incidencia:', err);
      }
    });
  }

}
