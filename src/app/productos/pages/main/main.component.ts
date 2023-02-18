import { Component, ViewChild,  AfterViewChecked } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { IProductos } from '../../interfaces/data.interface';
import { ProductosService } from '../../services/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements  AfterViewChecked{
  
  @ViewChild
  (MatSidenav)

  viewSidenav!: MatSidenav;

  userData!: IProductos;

  constructor(private loginService: LoginService,
              private router: Router,
              private productosService: ProductosService,
              private dialogo: MatDialog,
              private observer: BreakpointObserver,
              private cdRef:ChangeDetectorRef
              ) {
      this.productosService.obtenerData()
      .subscribe (res => {
        this.userData = res;
      });
  }
  
  ngAfterViewChecked(): void {    
    this.observer.observe(['(max-width: 600px)']).subscribe((res) => {
      if (res.matches) {
        this.viewSidenav.mode = 'over';
      } else {
        this.viewSidenav.mode = 'side';
      }
    });
    this.cdRef.detectChanges();
  }

  logout() {
    this.dialogo
      .open(DialogConfirmComponent, {
        data: {
          titulo:"Cerrar sesión",
          descripcion:"¿Esta seguro que desea cerrar sesión?"
        }
      })
      .afterClosed()
      .subscribe( (confirmacion:boolean) => {
        if(confirmacion){
          this.loginService.logout();
          this.router.navigate(['login'])
        }
      })    
  }
}
