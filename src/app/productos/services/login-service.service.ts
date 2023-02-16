import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ILoginData, IResponse, IUser } from '../interfaces/login-data.interface';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //Obtenemos el token
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
  public isLoggeddIn(){
    let token = localStorage.getItem('user');
    if(token == null || token == undefined || token == ''){
      return false;
    }else{
      return true;
    };
  }

  //Cerrar session y eliminar el token del localStorage
  public logout(){
    localStorage.removeItem('user');
    return true;
  }


}
