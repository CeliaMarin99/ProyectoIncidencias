import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(public login:LoginService, private router:Router){}

  ngOnInit(): void {
      
  }

  public logout(){
    this.login.logout();
    this.router.navigate(['']);
  }
}
