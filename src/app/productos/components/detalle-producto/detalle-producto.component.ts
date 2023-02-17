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

  producto: IProduct = {
    "id": 7,
    "path": "",
    "image": "https://dinahosting.com/blog/cont/uploads/2021/03/error-404.jpg",
    "title": "No se encuentra el producto",
    "longDescription": "",
    "shortDescription": ""
};

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
            
                let fProduct = response.products.find(pr => pr.path.substring(1) === param.id)
                if(fProduct){
                  this.producto = fProduct;
                }  
            })                  
      },
      /*error => {
        console.log(error);
        this.snack.open('El producto no existe en la base de datos', 'Redireccionando...', {
          duration: 2000
        });
        this.router.navigate(['main/home']);
      }*/)

  }

}
