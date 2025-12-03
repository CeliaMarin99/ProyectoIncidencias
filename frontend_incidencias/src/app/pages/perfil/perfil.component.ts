import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../Models/usuario';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{

  user !: Usuario;
  constructor(
    private login: LoginService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.user= this.login.getUser();
    this.buscarUsuario(this.user);
  }

  editarUsuario(user:Usuario): void {

    this.userService.editarUsuario(user.id!, user).subscribe({
      next: (response) => {
        console.log('Usuario editado:', response);
        this.user = response;
        this.router.navigate(['/user/perfil']);
      },
      error: (err) => {
        console.error('Error al crear incidencia:', err);
      }
    })
  }

  buscarUsuario(user: Usuario): void {
    this.userService.getUserByUsername(user.username).subscribe({
      next: (response) => {
        console.log('Usuario actual:', response);

         // ACTUALIZAMOS el objeto en el componente
          this.user = response;

        // Guardamos el nuevo usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response));
      },
      error: (err) => {
        console.error('Error al crear incidencia:', err);
      }
    })
  }
}
