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

  //metodo para mensajes enviados
  obtenerMensajesEnviados(emisorId: number){
    return this.http.get<mensaje[]>(`${baseUrl}/mensajes/enviados/${emisorId}`);
  }

  //metodo para mensajes recibidos
  obtenerMensajesRecibidos(receptorId: number){
    return this.http.get<mensaje[]>(`${baseUrl}/mensajes/recibidos/${receptorId}`);
  }

  obtenerMensajesEnviadosPorIncidencia(idIncidencia: number, idEmisor: number){
    return this.http.get<mensaje[]>(`${baseUrl}/mensajes/incidencia-enviados/${idIncidencia}/${idEmisor}`);
  }

  obtenerMensajesRecibidosPorIncidencia(idIncidencia: number, idReceptor: number){
    return this.http.get<mensaje[]>(`${baseUrl}/mensajes/incidencia-recibidos/${idIncidencia}/${idReceptor}`);
  }
}
