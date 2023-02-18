import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    user: [ '', Validators.required ],
    password: ['', Validators.required]
  });
    
  constructor ( private snack: MatSnackBar,
                private loginService: LoginService,
                private router: Router,                
                private fb: FormBuilder,
                private spinner: NgxSpinnerService) {
    // si esta logueado enviamos al main
    if(this.loginService.isLoggeddIn()){
      this.router.navigate(['main']);
    }
  }

  formSubmit() {

    this.form.markAllAsTouched();
    this.form.get('user')?.setValue(this.form.get('user')?.value.trim())
    this.form.get('password')?.setValue(this.form.get('password')?.value.trim())

    if(this.form.invalid)
      return; 
     
     this.spinner.show();
     this.loginService.obtenerData(this.form.getRawValue())
        .subscribe ( res =>{

          //si no coinciden las credenciales mostramos el mensaje que recibimos del servicio
          if(!res.status) {
            this.spinner.hide();
            this.snack.open(res.message, 'Aceptar',{
              duration: 3000
            });
            return;
          }

          //Almacenamos los datos en el localStorage 
          this.loginService.loginUser(res.data);

          //Navegamos al main de la pagina
          this.spinner.hide();
          this.router.navigate(['main/home']);

        }, (error) => {
          console.log(error);
          this.spinner.hide();
          this.snack.open('Ha ocurrido un error, Vuelva a intentarlo mas tarde', 'Aceptar',{
            duration: 3000
          })
        } );
  }
  
}
