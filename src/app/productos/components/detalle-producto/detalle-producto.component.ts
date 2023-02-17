import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/data.interface';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  /*producto?: IProduct = {
    "id": 3,
    "path": "/efecty",
    "image": "https://cityplazacc.com/wp-content/uploads/2020/01/EFECTY.jpg",
    "title": "Efecty",
    "longDescription": "- Envío de giros.\n- Consultar la relación de giros enviados y de giros disponibles para retiro.\n- Realizar y consultar el pago de tus obligaciones de diferentes convenios.\n- Conocer las tarifas de los servicios de la compañía.\n- Ubicar los más de 10.000 puntos físicos de servicio para realizar tus transacciones si así lo requieres.\n- Informarte sobre nuestras promociones y eventos.\n",
    "shortDescription": "Efecty pensando en ti, pone a tu disposición la APP como una de las soluciones de nuestro ecosistema digital, que te permitirá:"
};*/

  producto?: IProduct;
  productos!: IProduct[];
  id = '';

  constructor(private productosService: ProductosService,
              private snack: MatSnackBar,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initProdut();
  }

  initProdut() {

    this.activateRoute.params
      .subscribe((param: any) => {
          this.productosService.obtenerData()
            .subscribe(response => {
              this.producto = response.products.find(pr => pr.path.substring(1) === param.id)
              console.log(this.producto);
            })

          if (!this.producto) {
            this.snack.open('El producto no existe en la base de datos', 'Redireccionando...', {
              duration: 2000
            });
            console.log('aki pasa para redireccion')
            this.router.navigate(['main/home']);
          }         
      },
      error => {
        console.log(error);
        this.snack.open('El producto no existe en la base de datos', 'Redireccionando...', {
          duration: 2000
        });
        this.router.navigate(['main/home']);
      })

  }

}
