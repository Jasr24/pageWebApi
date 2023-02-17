import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/data.interface';

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.css']
})
export class VistaPreviaComponent {

  @Input()
  producto!: IProduct;

}
