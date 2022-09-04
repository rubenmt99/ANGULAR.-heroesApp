import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  //si utilizas canLoad el modulo no se carga, si utilizas CanActivate
  //el modulo se carga pero no se activa, dependiendo de la respuesta
  //del guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
     /* if (this.authService.auth.id){
        return true
      }
        return false;*/


      return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if (!estaAutenticado){
                    this.router.navigate(['./auth/login']);
                  }
                })
              )
  }


  //Si devuelve true puede mostrar la página, si es false no muestra la ruta.
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      /*Si tenemos algo en el auth que nos deje pasar a la página.
      Tenemos que pasar el id porque si pasamos el auth solo, al ser
      un objeto siempre tendria algo.
      Con esto, si ingreso, salgo y vuelvo a entrar sin el login podría entrar
      Por ello hay que activar el canActivate.*/
    /* if (this.authService.auth.id){
        return true
      }
        return false;*/


        return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if (!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        )
  }
}
