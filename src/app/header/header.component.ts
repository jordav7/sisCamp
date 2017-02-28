import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fecha: Date;
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.fecha = new Date();
  }

  cerrarSesion() {
    console.log('Ingreso al cierre de sesion');
    this.authenticationService.logout();
    console.log('Redirijo al login');
    this.router.navigate(['login']);
  }

}
