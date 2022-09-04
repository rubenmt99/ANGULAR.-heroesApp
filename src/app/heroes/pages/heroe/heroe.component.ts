import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }`]
})
export class HeroeComponent implements OnInit {

  heroe !: Heroe;

  id :string = '';

  constructor(private route: ActivatedRoute,
              private service: HeroesService) { }

  //Params nos devuelve un observable de esta ruta el cual contiene
  //el parámetro de nuestra url el cual queremos obtener. (ej. dc-batman)
  //al ser observable nos tenemos que subscribir.

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap( ({id}) => this.service.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe = heroe);
    
  }

  

}
