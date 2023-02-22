import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router:Router){

  }
 
  canActivate() {

    if(!this.loginService.isLoggeddIn()){
      this.router.navigate(['/login']);
    }

    return this.loginService.isLoggeddIn();
  }

}
