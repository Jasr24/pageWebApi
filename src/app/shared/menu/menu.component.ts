import { Component } from '@angular/core';
import { ProductosService } from '../../productos/services/productos.service';
import { IResponse, IProductos } from '../../productos/interfaces/data.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  userData!: IProductos;

  constructor (private productosService: ProductosService) {

    this.productosService.obtenerData()
      .subscribe (res => {
        this.userData = res;
      })
  }

  // logout(){

  // }

}
