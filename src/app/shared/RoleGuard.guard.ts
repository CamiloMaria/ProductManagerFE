import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Obtener el rol del usuario desde el servicio de autenticación
      const userRole = localStorage.getItem('token')

      // Verificar si el rol del usuario coincide con el rol requerido en la ruta\
      if (userRole === route.routeConfig?.data!['role']) {
        return true; // Permitir el acceso a la ruta
      } else {
        // Redirigir a una página de acceso no autorizado u otra página apropiada
        if (!userRole) {
          this.router.navigate(['/login']);
          return false;
        }
        this.router.navigate([userRole]);
        return false; // Denegar el acceso a la ruta
      }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivate(childRoute, state);
  }
}
