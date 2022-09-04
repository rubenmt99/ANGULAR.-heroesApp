import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  styles: [`
    img{
      width: 100%;
      border-radius:5px;
    }
  `]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe : Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    //al hacer click en editar sobre un heroe creado por nosotros 
    //nos manda a una url con heroes/ y un id. Obtengamos ese id

    //Vamos a tener parametro de id cuando vayamos a editar,
    //ya que cuando no está creado no tiene id. Por lo cual
    //necesitamos este if si no cuando vayamos a crear un heroe
    //nos estará dando error al dar el id undefined.

    if( !this.router.url.includes('editar')){
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe)

  }


  guardar(){

    if( this.heroe.superhero.trim().length == 0){
      return;
    }

    //Si el heroe tiene un id significa que ya habia sido creado,
    //por lo que tendria que editarse y no crearse
    if( this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackBar('Registro actualizado'));

    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe=> {
        this.router.navigate( ['/heroes/editar',heroe.id] );
        this.mostrarSnackBar('Registro creado');
      })
    }
  }


  borrarHeroe(){

    //Creamos un componente en Components para coger su html
    const dialog = this.dialog.open( ConfirmarComponent,  {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe( result => {
      if (result){
        this.heroesService.borrarHeroe(this.heroe.id!)
      .subscribe ( resp=> {

        this.router.navigate(['/heroes']);
        this.mostrarSnackBar('Héroe borrado');
      })
      }
    } )

    
  }



  mostrarSnackBar( mensaje:string ){
    //mensaje,acción,configuración
    this.snackBar.open(mensaje, 'ok!', {
      duration:2500
    });
  }

}
