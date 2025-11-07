import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeClientComponent } from './pages/user/home-client/home-client.component';
import { CrearIncidenciaComponent } from './pages/crear-incidencia/crear-incidencia.component';
import { EditarIncidenciaComponent } from './pages/editar-incidencia/editar-incidencia.component';
import { TecnicoHomeComponent } from './pages/tecnico/tecnico-home/tecnico-home.component';


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
      { path: 'home', component: HomeClientComponent },
      { path: 'crear', component: CrearIncidenciaComponent },
      { path: 'editar', component: EditarIncidenciaComponent}
    ]
  },

     //Rutas páginas tecnico
  {
    path: 'tecnico',
    children: [
      { path: 'home', component: TecnicoHomeComponent}
    ]
  },

  // Ruta por defecto
  { path: '**', redirectTo: 'auth/login' }
];
