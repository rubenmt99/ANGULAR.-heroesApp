import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, of, map } from 'rxjs';


//Como esta en el root puedo usarlo desde cualquier lado, solo hay que importarlo
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;


  /*Quremos obtener el _auth y mostrarlo en el html del home en heroe,
    por lo cual como la propiedad está privada vamos a hacer un get
    y desestructuramos para asegurarnos de que no va a sufrir ningun cambio*/
  get auth(): Auth{
    return {...this._auth!}
  }


  constructor( private http: HttpClient) { }



  /*Estará verificado cuando en el localStorage se encuentre su Token con un respectivo
    valor. Si hay token devuelve un true, si no devuelve false de un Observable.
    El token se obtiene si ha iniciado sesion en el login().
    Con lo que retorne trabajaremos en el auth.guard*/
  verificaAutenticacion():Observable<boolean>{
    if( !localStorage.getItem('token')){
      //con el off se hace el return de un observable
      return of(false);
    }

    //map sirve para transformar el valor en este caso pasa
    //de un observable con Auth a un boolean
    return this.http.get<Auth>(this.baseUrl+'/usuarios/1')
            .pipe(
              map( auth => {
                //este auth es para que al recargar la pagina no perdamos la informacion del usuario
                this._auth = auth;
                return true;
              })
            )
  }



  login(){
    /*queremos almacenar el usuario en _auth, por lo cual,
    antes de que se haga el subscribe en login.component,
    obtenemos el Auth mediante el pipe y tap.
    con tap obtenemos el Auth que nos devuelve antes de que pase
    por el subscribe. Si hiciesemos subscribe aquí no se podría hacer
    ya en el login.component
    
    Usamos el segundo tap para almacenar el valor en el localStorage
    para al hacer refresh de la pagina no perder el valor*/
    return this.http.get<Auth>(this.baseUrl+'/usuarios/1')
            .pipe(
              tap( auth => this._auth = auth),
              tap( auth => localStorage.setItem('token',auth.id)),
            );
  }



}
