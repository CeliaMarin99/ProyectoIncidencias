import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mensaje } from '../Models/mensaje';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http:HttpClient) { }

  //metodo para enviar mensaje
  enviarMensaje(mensaje: mensaje){
    return this.http.post(`${baseUrl}/mensajes/enviar`, mensaje);
  }
}
