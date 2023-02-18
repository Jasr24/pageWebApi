import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/data.interface';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute } from '@angular/router';

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
      })

  }

}
