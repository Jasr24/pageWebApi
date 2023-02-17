import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.css']
})
export class VistaPreviaComponent {

  @Input()
  producto!: IProduct;

  constructor (
    private router: Router
  ) {
    if(this.producto){
      console.log(this.producto.path);
    }
  }

}
