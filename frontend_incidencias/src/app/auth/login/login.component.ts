import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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
  
  constructor(private loginService: LoginService, private router: Router) {}

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
          this.loginService.setUser(user);
          console.log("Usuario actual:", user);

          //Comprueba el rol y muestra la página correspondiente
          if(this.loginService.getUserRole() == "ROLE_TECNICO"){
            //dashboard tecnico
             this.router.navigate(['/tecnico/home']);
          }else if(this.loginService.getUserRole() == "ROLE_USUARIO"){
            //user dashboard
             this.router.navigate(['/user/home']);
          }else{
            this.loginService.logout();
          }
        }

        )
        
      },
      (error) => {
        console.log("Error al generar token:", error);
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
