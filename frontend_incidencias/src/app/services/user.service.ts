import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private users: Usuario[] =[];

  constructor(private http:HttpClient) {}

  // Registrar usuario con rol
  register(user: Usuario, rol:string): Observable<Usuario> {
    return this.http.post<Usuario>(`${baseUrl}/users/registrar/${rol}`, user);
  }

  getUserByUsername(username: string): Observable<Usuario> {
  return this.http.get<Usuario>(`${baseUrl}/users/username/${username}`);
  }

  findAll():Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${baseUrl}/users`);
  }

  editarUsuario(idUsuario: number, user:Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${baseUrl}/users/editar/${idUsuario}`, user);
  }

  eliminarUsuario(idUsuario: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${baseUrl}/users/eliminar/${idUsuario}`);
  }
}
