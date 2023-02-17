import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/data.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productos!: IProduct[];

  constructor (private productosService: ProductosService) {

    this.productosService.obtenerData()
      .subscribe (res => {
        this.productos = res.products;
      });
  }

}
