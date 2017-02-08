import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent implements OnInit {

  usuario: string = '';
  password: string = '';
  messages: Message[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log('Ingresa a login');
    this.authenticationService.login(1, this.usuario, this.password).subscribe(
      respuesta =>{
        if(localStorage.getItem('currentUser')){
          console.log('Verifica token');
          this.router.navigate(['home']);
        }
      },
      err =>{
        this.messages.push({severity:'error', summary:'Usuario o password incorrectos', detail:''});
        console.log(err);
      }
    );
  }


}
