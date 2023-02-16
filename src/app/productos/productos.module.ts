import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Angular material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';

//Componentes 
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ProductosModule { }
