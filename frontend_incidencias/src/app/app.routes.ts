import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { CrearIncidenciaComponent } from './pages/crear-incidencia/crear-incidencia.component';
import { EditarIncidenciaComponent } from './pages/editar-incidencia/editar-incidencia.component';

export const routes: Routes = [
      // Rutas públicas (sin navbar)
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent }
    ]
  },

   //Rutas privadas (con navbar)
  {
    path: 'incidencias',
    children: [
      { path: 'home', component: HomeClientComponent },
      { path: 'crear', component: CrearIncidenciaComponent },
      { path: 'editar', component: EditarIncidenciaComponent}
    ]
  },

  // Ruta por defecto
  { path: '**', redirectTo: 'auth/login' }
];
