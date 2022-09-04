import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [


  //CanLoad. Cuando alguien intente cargar este modulo va a mirar si esta
  //autentificado

  //PARA LAS RUTAS HIJAS
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
    
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(n => n.HeroesModule),
    canLoad: [ AuthGuard ],
    canActivate: [AuthGuard]
  },

  //RUTAS PRINCIPALES
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404'
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
