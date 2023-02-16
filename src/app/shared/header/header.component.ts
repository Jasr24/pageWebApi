import { Component } from '@angular/core';
import { LoginService } from '../../productos/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private loginService: LoginService,
              private router: Router) {}


  logaut () {
    this.loginService.logout();
    this.router.navigate(['login'])
  }
}
