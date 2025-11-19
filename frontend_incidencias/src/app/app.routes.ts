import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeClientComponent } from './pages/user/home-client/home-client.component';
import { CrearIncidenciaComponent } from './pages/crear-incidencia/crear-incidencia.component';
import { EditarIncidenciaComponent } from './pages/editar-incidencia/editar-incidencia.component';
import { TecnicoHomeComponent } from './pages/tecnico/tecnico-home/tecnico-home.component';
import { UsuarioGuard } from './services/usuario.guard';
import { AsignarIncidenciasComponent } from './pages/tecnico/asignar-incidencias/asignar-incidencias.component';


export const routes: Routes = [
      // Rutas públicas (sin navbar)
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent }
    ]
  },

   //Rutas páginas usuario
  {
    path: 'user',
    children: [
      { path: 'home', component: HomeClientComponent, /*canActivate: [UsuarioGuard]*/ },
      { path: 'crear', component: CrearIncidenciaComponent ,/*canActivate: [UsuarioGuard]*/ },
      { path: 'editar/:id', component: EditarIncidenciaComponent /*,canActivate: [UsuarioGuard] */}
    ]
  },

     //Rutas páginas tecnico
  {
    path: 'tecnico',
    children: [
      { path: 'home', component: TecnicoHomeComponent},
      { path: 'asignar', component: AsignarIncidenciasComponent},

    ]
  },

  // Ruta por defecto
  { path: '**', redirectTo: 'auth/login' }
];
