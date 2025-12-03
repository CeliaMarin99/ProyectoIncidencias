import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  rol:string = "";
  admin: boolean= false;
  constructor(public login:LoginService, private router:Router){}

  ngOnInit(): void {
       this.rol = this.login.getUserRole();
       this.admin = this.login.esAdmin();

      console.log("ROL:", this.rol);

  }

  public logout(){
    this.login.logout();
    this.router.navigate(['']);
  }
}
