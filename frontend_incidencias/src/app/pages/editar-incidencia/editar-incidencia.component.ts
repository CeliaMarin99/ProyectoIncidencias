import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { IncidenciaService } from '../../services/incidencia.service';
import { Incidencia } from '../../Models/incidencia';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-incidencia',
  imports: [NavbarComponent, FormsModule],
  templateUrl: './editar-incidencia.component.html',
  styleUrl: './editar-incidencia.component.scss'
})
export class EditarIncidenciaComponent implements OnInit{

   incidencia!: Incidencia;

  constructor(
    private incidenciaService: IncidenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Recuperamos el ID desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar LA INCIDENCIA concreta
    this.incidenciaService.findById(id).subscribe(i => {
      this.incidencia = i;
    });
  }

  updateIncidencia(): void {
    this.incidenciaService.editarIncidencia(this.incidencia)
      .subscribe(() => {
        // Volver a la lista o home del cliente
        this.router.navigate(['/user/home']);
      });
  }
 
}
