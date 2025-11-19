import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { LoginService } from '../../services/login.service';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-enviar-mensaje',
  imports: [NavbarComponent],
  templateUrl: './enviar-mensaje.component.html',
  styleUrl: './enviar-mensaje.component.scss'
})
export class EnviarMensajeComponent implements OnInit {

  mensaje = {
    contenido: '',
    fecha: '',
    emisor: { id: 0 },  // ← se rellena automáticamente con el usuario logeado
    receptor: { id: 0 }, // ← se asigna el técnico correspondiente
    incidencia: { id: 0 } // ← se asigna la incidencia correspondiente
  };

  constructor(
    private loginService:LoginService,
    private mensajesService:MensajesService 
  ) { }

  ngOnInit(): void {}

  //metodo para enviar mensaje
  enviarMensaje():void{
    // Obtener el usuario actual del localStorage
    const user = this.loginService.getUser();
    if (user && user.id) {
      this.mensaje.emisor.id = user.id;
    }
    
    this.mensajesService.enviarMensaje(this.mensaje).subscribe({
      next:(response)=>{
        console.log('Mensaje enviado:', response);
      },
      error:(err)=>{
        console.error('Error al enviar mensaje:', err);
      }
    });
  }
}
