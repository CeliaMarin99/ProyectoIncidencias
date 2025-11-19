import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { NgFor } from '@angular/common';
import { IncidenciaService } from '../../../services/incidencia.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { Incidencia } from '../../../Models/incidencia';


@Component({
  selector: 'app-tecnico-home',
  imports: [NavbarComponent, NgFor],
  templateUrl: './tecnico-home.component.html',
  styleUrl: './tecnico-home.component.scss'
})
export class TecnicoHomeComponent implements OnInit {

  incidencias: Incidencia[] = [];

  constructor(
    private incidenciaService: IncidenciaService,
    private loginService: LoginService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    const user = this.loginService.getUser();
    const id = user.id;

    if (user && user.id) {
      this.obtenerIncidenciasTecnico(id);
    } else {
      console.error('No se encontró usuario logueado'); 
    } 
  }

  obtenerIncidenciasTecnico(id: number): void {
    this.incidenciaService.findbyTecnico(id).subscribe({
      next: (data) => {
        this.incidencias = data;
        console.log("Incidencias del técnico: ", this.incidencias);
      },
      error: (err) => {
        console.log("Error al recuperar las incidencias del técnico: ", err);
      } 
    });
  }

  }

  

