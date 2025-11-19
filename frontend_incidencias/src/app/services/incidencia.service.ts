import { Injectable } from '@angular/core';
import { Incidencia } from '../Models/incidencia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private incidencias: Incidencia[] =[];
  
  constructor(private http:HttpClient) { }

  //Metodo para recuperar todas las incidencias del empleado
  findByEmpleado(idEmpleado: number): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${baseUrl}/incidencias/empleado/${idEmpleado}`);
  }

  //
  findbyTecnico(idTecnico: number): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${baseUrl}/incidencias/tecnico/${idTecnico}`);
  }
  //Metodo para reportar una incidecnia
  reportarIncidencia(incidencia: Incidencia): Observable<Incidencia> {
    return this.http.post<Incidencia>(`${baseUrl}/incidencias/crear`, incidencia);
  }

  //Modificar incidencia
  editarIncidencia(incidencia: Incidencia): Observable<Incidencia>{
    return this.http.put<Incidencia>(`${baseUrl}/incidencias/editar/${incidencia.id}`, incidencia);
  }

  //Buscar Incidencia por id
  findById(id: number): Observable<Incidencia> {
  return this.http.get<Incidencia>(`${baseUrl}/incidencias/${id}`);
}

  //Devolver todas las incidencias
  findAll(): Observable<Incidencia[]>{
    return this.http.get<Incidencia[]>(`${baseUrl}/incidencias`);
  }

  //Eliminar incidencia
  delete(id: number): Observable<Incidencia>{
    return this.http.delete<Incidencia>(`${baseUrl}/incidencias/${id}`);
  }

  //Buscar incidencia
  buscarIncidencia(palabraClave: string): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${baseUrl}/incidencias/search/${palabraClave}`);
  }

  //Devolver todas las incidencias no asignadas a un tecnico
  findUnassignedIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${baseUrl}/incidencias/sin-tecnico`);
  }

  //Asignar tecnico a una incidencia
  asignarTecnico(idIncidencia: number, idTecnico: number): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${baseUrl}/incidencias/asignar-tecnico/${idIncidencia}/tecnico/${idTecnico}`,{});
  }

}
