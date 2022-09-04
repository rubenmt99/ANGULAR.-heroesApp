import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';


/*Pure.
Si no ponemos pure, al cambiar la imagen la pagina no la detecta
hasta que hagamos refresh. Si embargo, al poner pipe,
si es true (comportamiento por defecto) se invocará cuando el argumento cambie, en este caso
cambiaria el alt_img pero no el objeto, pues sería el mismo espacio
en memoria. Sin embargo, con pure: false se va a ejecutar
el metodo transform cada vez que se detecte algún cambio,
incluso si el argumneto no ha cambiado*/

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroeRecibido: Heroe): string {


    //tener en cuenta que los heroes que van a tener alt_img
    //son los que creamos nosotros. Los que vienen por defecto
    //están en el assets las imágenes.

    if( !heroeRecibido.id ){
      return 'assets/no-image.png'
    }else if (heroeRecibido.alt_img){
      return heroeRecibido.alt_img
    }else{
      return "assets/heroes/"+heroeRecibido.id+".jpg";
    }
    
  }

}
