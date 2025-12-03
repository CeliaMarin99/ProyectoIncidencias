import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { MensajesService } from '../../services/mensajes.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { mensaje } from '../../Models/mensaje';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-buzon-mensajes',
  imports: [FormsModule, NavbarComponent, NgFor, CommonModule],
  templateUrl: './buzon-mensajes.component.html',
  styleUrl: './buzon-mensajes.component.scss'
})

export class BuzonMensajesComponent implements OnInit {

  mensajes: mensaje[] = [];
  tipoSeleccionado: string = ''; // valor por defecto
  filtro: string = '';
  idIncidencia!: number;

  constructor(
    private mensajesService: MensajesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.mostrarMensajes(this.tipoSeleccionado); // carga inicial
  }

  mostrarMensajes(tipoSeleccionado:string): void {
    const usuario = this.loginService.getUser();
    if (!usuario || !usuario.id) {
      console.error("No hay usuario logeado");
      return;
    }

    if (tipoSeleccionado == 'recibidos') {
      // Obtener mensajes recibidos
      this.filtro = 'recibidos';
      this.mensajesService.obtenerMensajesRecibidos(usuario.id).subscribe({
        next: (data) => {
          this.mensajes = data;
          console.log("Mensajes recibidos:", data);
        }
      });
    } 
    else if (tipoSeleccionado == 'enviados') {

      this.filtro = 'enviados';
      // Obtener mensajes enviados
      this.mensajesService.obtenerMensajesEnviados(usuario.id).subscribe({
        next: (data) => {
          this.mensajes = data;
          console.log("Mensajes enviados:", data);
        }
      });
    }
  }

  buscarMensajesPorIncidencia(): void {

    const usuario = this.loginService.getUser();

    console.log("TipoSeleccionado: ", this.filtro);

      //mensajes enviados
      if(this.filtro == 'enviados'){

        console.log("id de incidencia =", this.idIncidencia)

        this.mensajesService.obtenerMensajesEnviadosPorIncidencia(this.idIncidencia, usuario.id).subscribe({
          next: (data) => {
          this.mensajes = data;
          console.log("Mensajes enviados por incidencia:", data);
          }
        });

      }else if(this.filtro == 'recibidos'){

         this.mensajesService.obtenerMensajesRecibidosPorIncidencia(this.idIncidencia, usuario.id).subscribe({
          next: (data) => {
          this.mensajes = data;
          console.log("Mensajes recibidos por incidencia:", data);
          }
        });
      }
  }
}




