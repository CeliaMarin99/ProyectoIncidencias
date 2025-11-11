import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root' })
export class UsuarioGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const user = this.loginService.getUser(); //obtiene usuario del token

    if (user && user.roles.includes('ROLE_USUARIO')) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
