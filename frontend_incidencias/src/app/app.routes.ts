import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
      // Rutas públicas (sin navbar)
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent }
    ]
  },

  /* Rutas privadas (con navbar)
  {
    path: '',
    component: LayoutComponent, // Contiene navbar
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'incidencias', component: IncidenciasComponent },
      { path: 'perfil', component: PerfilComponent }
    ]
  },
*/
  // Ruta por defecto
  { path: '**', redirectTo: 'auth/login' }
];
