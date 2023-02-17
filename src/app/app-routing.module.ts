import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './productos/pages/home/home.component';
import { LoginComponent } from './productos/pages/login/login.component';
import { AuthGuard } from './productos/services/auth.guard';
import { MainComponent } from './productos/pages/main/main.component';
import { DetalleProductoComponent } from './productos/components/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },  
      {
        path: 'detalle/:id',
        component: DetalleProductoComponent
      }
    ]
  },  
  {
    path: '**',
    redirectTo: 'main/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
