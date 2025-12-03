import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  // Rutas verdaderamente públicas
  const publicUrls = [
    '/users/login',
    '/users/crear',
    '/registrar',    // si sigues usando esta
  ];

  // Comprueba si la request es pública
  const isPublic = publicUrls.some(url => req.url.includes(url));

  // Si es pública → no enviamos token
  if (isPublic) {
    return next(req);
  }

  // Para el resto de rutas → añadir token si existe
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};

