import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { IProductos, IResponse } from '../interfaces/data.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environment.baseUrl;
  private userToken: string = JSON.parse(localStorage.getItem('user')!).userToken;


  private productos$ = new BehaviorSubject<IProductos>({ products: [], menu: [] });


  constructor(private http: HttpClient) {

    this.getProductos()
      .subscribe(res => {
        //Si existe la data
        if(res.data){
          this.productos$.next(res.data);
        }
      });

  }

  private getProductos(): Observable<IResponse<IProductos>> {
    return this.http.post<any>(`${this.baseUrl}/getproducts`, { userToken: this.userToken })
      .pipe(
        map(response => {
          response.data = JSON.parse(response.data)
          return response;
        })
      )
  }

  //Obtenemos la data de la peticion con el token registrado
  public obtenerData(): Observable<IProductos> {
    return this.productos$.asObservable();
  }

}
