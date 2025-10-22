import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  // Objeto user como propiedad del componente
  public user = {
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    telefono: ''
  };

    constructor(private userService:UserService) { }

    ngOnInit(): void {
        
    }
    
    formSubmit() {
      console.log(this.user);
      if(this.user.nombre=='' || this.user.nombre==null){
        return alert("El nombre es obligatorio");
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data)=>{
        console.log(data);
        alert("Usuario registrado con éxito");
      }, (error)=>{
        console.log(error);
        alert("Error al registrar el usuario");
      }
    )
  }

}
