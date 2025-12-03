import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../Models/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  users: Usuario[] = [];

  usuarioActual!: Usuario;

  //Usuario
  selectedUser: Usuario = {
  id: 0,
  name: '',
  last_name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  roles: [],
  admin: false
};

 adminCheck: boolean = false;

  // Paginación
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalPagesArray: number[] = [];
  username: string = "";

  constructor(
    private login: LoginService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.usuarioActual = this.login.getUser();
    this.ObtenerTodosLosUsuarios();
  }

   ObtenerTodosLosUsuarios(): void {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;

        // Calcular total de páginas
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  //Abrir modal con usuario cargado
  openEditModal(user: Usuario) {
    this.selectedUser = JSON.parse(JSON.stringify(user)); 
  }

   openDeleteModal(user: Usuario) {
    this.selectedUser = JSON.parse(JSON.stringify(user)); 
  }


  //Editar Usuario
  editarUsuario(): void {

    const id = this.selectedUser.id;
    this.userService.editarUsuario(id!, this.selectedUser).subscribe({
      next: () => {
      alert("Usuario actualizado correctamente");
      this.ObtenerTodosLosUsuarios(); // refrescar tabla
      },
      error: (err) => console.error("Error al actualizar usuario", err)
    });
  }

  //Eliminar Usuario
  eliminarUsuario(): void {
    const id = this.selectedUser.id;
    this.userService.eliminarUsuario(id!).subscribe({
      next: () => {
        alert("Usuario eliminado correctamente");
        this.ObtenerTodosLosUsuarios(); // refrescar tabla
      },
      error: (err) => {
        alert("Error al eliminar usuario");
        console.error("Error al eliminar usuario", err);
      }
    })
  }

  //cerrar sesion
  public logout(){
    this.login.logout();
    this.router.navigate(['']);
  }

  //esAdmin
  public esAdmin(){
    return this.login.esAdmin();
  }

 buscarPorUsername(): void {
  this.userService.getUserByUsername(this.username).subscribe({
    next: (data) => {
      console.log("Usuario encontrado", data);
      this.users = [data];  // ⬅️ Mostramos SOLO ese usuario en la tabla
      this.currentPage = 1; // Reiniciar paginación
    },
    error: (err) => {
      console.error("Error al buscar usuario", err);
    }
  });
}

 
}
