import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { LoginService } from '../../services/login.service';
import { MensajesService } from '../../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviar-mensaje',
  imports: [NavbarComponent, FormsModule],
  templateUrl: './enviar-mensaje.component.html',
  styleUrl: './enviar-mensaje.component.scss'
})

export class EnviarMensajeComponent implements OnInit {

  mensaje = {
    contenido: '',
    fecha: '',
    emisor: { id: 0 },  // ← se rellena automáticamente con el usuario logeado
    receptor: { 
      id:0,
      username: ''
    }, // ← se asigna el técnico correspondiente
    incidencia: { id: 0 } // ← se asigna la incidencia correspondiente
  };

  constructor(
    private loginService:LoginService,
    private mensajesService:MensajesService,
    private usuarioService:UserService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  //metodo para enviar mensaje
  enviarMensaje():void{
    // Obtener el usuario actual del localStorage
    const user = this.loginService.getUser();
    if (user && user.id) {
      this.mensaje.emisor.id = user.id;
    }

    const usernameReceptor = this.mensaje.receptor.username;

    this.usuarioService.getUserByUsername(usernameReceptor).subscribe({
    next: (receptorEncontrado) => {
      
      // Asignar el ID real del receptor
      this.mensaje.receptor.id = receptorEncontrado.id;

      //Enviar ahora el mensaje
      this.mensajesService.enviarMensaje(this.mensaje).subscribe({
        next: (response) => {
          console.log('Mensaje enviado:', response);
        },
        error: (err) => {
          console.error('Error al enviar mensaje:', err);
        }
      });

      // Redirigir a la página de mensajes después de enviar
      this.router.navigate(['/empleado/home']);

    },
    error: () => {
      alert("No existe un usuario con ese nombre.");
      console.error('Username', usernameReceptor, 'no encontrado.');
      console.log('id receptor asignado:');
    }
  });
  }
}
