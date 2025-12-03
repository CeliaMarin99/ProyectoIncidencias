import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    email: '',
    password: '',
    name: '',
    last_name: '',
    phone: '',
    roles: [] as { name: string }[],
    admin:false
  };

  public rolSeleccionado: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    // Asignar rol elegido al usuario:
    this.user.roles = [
      { name: this.rolSeleccionado }
    ];

    console.log("Usuario enviado:", this.user);

    this.userService.register(this.user, this.rolSeleccionado).subscribe(
      (data) => {
        console.log(data);
        alert('Usuario registrado con éxito');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error(error);
        alert("Ya existe ese nombre se usuario, por favor elija otro.");
      }
    );
  }

}

