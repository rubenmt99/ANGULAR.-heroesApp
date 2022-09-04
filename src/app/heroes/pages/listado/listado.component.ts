import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroeTarjetaComponent } from '../../components/heroe-tarjeta/heroe-tarjeta.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  styles: []
})
export class ListadoComponent {

  misHeroes : Heroe[] = [];

  constructor( private heroesService : HeroesService) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
      .subscribe( heroes => {
        this.misHeroes = heroes;
      });
  }
  

}
