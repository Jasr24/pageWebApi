import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ILoginData, IResponse, IUser } from '../interfaces/data.interface';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //Obtenemos la data de la peticion
  public obtenerData(loginData: ILoginData): Observable<IResponse<IUser>>{
    return this.http.post<any>(`${this.baseUrl}/login`,loginData)
      .pipe(
        map(response=>{
          response.data = JSON.parse(response.data)
          return response;
        })
    )
  }

  //Iniciamos sesión y establecemos el token en el localStorage
  public loginUser(user:IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Este metodo nos permite saber si el usuario se encuentra logueado
  public isLoggeddIn(): boolean {
    let user = localStorage.getItem('user');
    let token = (user != null) ? JSON.parse(user!).userToken : null;
    if(token == null || token == undefined || token == ''){
      return false;
    }else{
      return true;
    };
  }

  //Cerrar session y eliminar el token del localStorage
  public logout(): boolean {
    localStorage.removeItem('user');
    return true;
  }

}
