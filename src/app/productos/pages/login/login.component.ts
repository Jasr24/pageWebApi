import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginData, IResponse } from '../../interfaces/login-data.interface';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  miFormulario: FormGroup = this.fb.group({
    user: [ , Validators.required],
    password: [ , Validators.required]
  });
  
  loginData:ILoginData = {
    user: "",
    password: ""
  };

  constructor ( private snack: MatSnackBar,
                private loginService: LoginServiceService,
                private router: Router,                
                private fb: FormBuilder,
                private spinner: NgxSpinnerService) {}


  formSubmit() {

    this.spinner.show();

    //Verificamos si los datos son null y suprimimos espacions al inicio y final
    this.loginData.user = (this.miFormulario.get('user')?.value != null) 
                              ? (this.miFormulario.get('user')?.value).trim() : null;
    this.loginData.password = (this.miFormulario.get('password')?.value != null) 
                              ? (this.miFormulario.get('password')?.value).trim() : null;

                              
    if(this.loginData.user == null || this.loginData.user == ''){
      this.spinner.hide();
      this.snack.open('El nombre de usuario es requerido!' , 'Aceptar',{
        duration:3000
      })
      return;
    } 

    if(this.loginData.password == null || this.loginData.password == ''){
      this.spinner.hide();
      this.snack.open('La contraseña es requerida!' , 'Aceptar',{
        duration:3000
      })
      return;
    }

     this.loginService.obtenerData(this.loginData)
        .subscribe ( res =>{

          // MOSTAR EL SPPINER //  OJO AL INCLUIR EL ERROR SEL SUBSCRIBE SE MARCA COMO DESHUSO
          ///////////////// ///////////// ///////////////// //////////////// ///////////// ///

          //Se realiza si no coinciden las credenciales
          if(!res.status) {
            this.spinner.hide();
            this.snack.open(res.message, 'Aceptar',{
              duration: 3000
            });
            return;
          }

          //Almacenamos los datos en el localStorage 
          this.loginService.loginUser(res.data);

          //Navegamos al home de la pagina
          this.spinner.hide();
          this.router.navigate(['home']);

        }, (error) => {
          console.log(error);
          this.spinner.hide();
          this.snack.open('Ha ocurrido un error, Vuelva a intentarlo', 'Aceptar',{
            duration: 3000
          })
        } );
  }
  
}
