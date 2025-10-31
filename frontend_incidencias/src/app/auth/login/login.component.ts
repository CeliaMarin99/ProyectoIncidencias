import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // 👈 styleUrls en plural
})
export class LoginComponent implements OnInit {

  public loginData = {
    username: '',
    password: ''
  };
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log("Login button clicked");

    if (this.loginData.username.trim() === '' || this.loginData.password.trim() === '') {
      alert('El nombre de usuario y la contraseña son obligatorios');
      return;
    }

    // Llamada al servicio para generar token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Token recibido:", data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any)=> {
          console.log("Usuario actual:", user);
        }

        )
        // Aquí puedes guardar el token en localStorage
        // localStorage.setItem('token', data.token);

      },
      (error) => {
        console.log("Error al generar token:", error);
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
