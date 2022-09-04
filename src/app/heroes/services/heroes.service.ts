import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  //hemos establecido las url en la carpeta environments
  //tener cuidado con el import de environment. Que no sea
  //environment.prod, mientras estemos desarrollando usamos environment solo
  //de desarrollo.
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.baseUrl+'/heroes')
  }


  getHeroePorId( id:string ):Observable<Heroe>{
    return this.http.get<Heroe>(this.baseUrl+'/heroes/'+id)
  }

  //Para el buscador. con el query ?q le decimos que nos muestre aquellos
  //query o heroes que tengan ese termino, esas letras
  //con limit vamos a limitar el numero de resultados de la query
  getSugerencias( termino:string ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.baseUrl+'/heroes?q='+termino+'&_limit=6');
  }


  //crear nuevo heroe. Para agregar parametro ponder ","
  agregarHeroe( heroe:Heroe ) :Observable<Heroe>{
    return this.http.post<Heroe>(this.baseUrl+'/heroes', heroe);
  }


  actualizarHeroe( heroe:Heroe ) :Observable<Heroe>{
    return this.http.put<Heroe>(this.baseUrl+'/heroes/'+heroe.id, heroe);
  }


  borrarHeroe( id: string ) :Observable<any>{
    return this.http.delete<any>(this.baseUrl+'/heroes/'+id);
  }

}
