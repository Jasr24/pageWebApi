import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';


//Angular material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

//Componentes 
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { VistaPreviaComponent } from './components/vista-previa/vista-previa.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    HomeComponent,
    VistaPreviaComponent,
    DetalleProductoComponent,
    DialogConfirmComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ] 
})
export class ProductosModule { }
