import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { IncidenciaService } from '../../services/incidencia.service';
import { Incidencia } from '../../Models/incidencia';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-editar-incidencia',
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './editar-incidencia.component.html',
  styleUrl: './editar-incidencia.component.css'
})
export class EditarIncidenciaComponent implements OnInit{

   incidencia!: Incidencia;
   esTecnico: boolean = false;

  constructor(
    private incidenciaService: IncidenciaService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {


    //Saber rol del usuario logueado
    const rol = this.loginService.getUserRole();
    console.log('Rol del usuario logueado:', rol);

    if(rol == "ROLE_TECNICO"){
      this.esTecnico = true;
    }
    // Recuperamos el ID desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar LA INCIDENCIA concreta
    this.incidenciaService.findById(id).subscribe(i => {
      this.incidencia = i;

      if (this.incidencia.fecha) {
        this.incidencia.fecha = this.incidencia.fecha.split(" ")[0];
      }
    });
  }

  updateIncidencia(): void {
    this.incidenciaService.editarIncidencia(this.incidencia)
      .subscribe(() => {

        console.log("Incidencia editada: ",this.incidencia);
        // Volver a la lista o home del cliente
        if(this.esTecnico){
          this.router.navigate(['/tecnico/home']);
        }else{
          this.router.navigate(['/empleado/home']);
        }
        
      });
  }
 
}
