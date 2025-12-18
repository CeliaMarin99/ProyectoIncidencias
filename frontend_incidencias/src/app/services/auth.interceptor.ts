import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  // Rutas públicas
  const publicUrls = [
    '/users/login',
    '/users/crear',
    '/registrar'
  ];

  const isPublic = publicUrls.some(url => req.url.includes(url));

  // Si es pública → NO añadimos token
  if (isPublic) {
    return next(req);
  }

  // Si NO es pública y hay token → lo añadimos
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 🔴 CLAVE: si no hay token, dejamos pasar la request
  return next(req);
};

