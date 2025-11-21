import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  añadirUsuario(user: any) {
  return this.http.post(`${baseUrl}/users/registrar`, user);
  }

  getUserByUsername(username: string): Observable<Usuario> {
  return this.http.get<Usuario>(`${baseUrl}/users/username/${username}`);
  }
}
