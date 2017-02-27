import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { Message } from 'primeng/primeng';

import { UtilMessages } from 'app/util/util-messages'

@Component({
  selector: 'ld-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent implements OnInit {

  usuario: string = '';
  password: string = '';
  messages: Message[] = [];
  logout: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private route: ActivatedRoute) {
    route.queryParams.subscribe(
      params => {
        if (params['qL']) {
          this.messages = UtilMessages.showWarningMessage('Se ha caducado su sesi\u00f3n por su seguridad debe iniciar nuevamente', '');
        }
      }
    );
  }

  ngOnInit() {
    if (this.logout) {

    }
  }

  login(){
    console.log('Ingresa a login');
    this.authenticationService.login(1, this.usuario, this.password).subscribe(
      respuesta =>{
        if(localStorage.getItem('currentUser')){
          console.log('Verifica token');
          this.router.navigateByUrl('/home');
        }
      },
      err =>{
        this.messages = [];
        this.messages.push({severity:'error', summary:'Usuario o password incorrectos', detail:''});
        console.log(err);
      }
    );
  }


}
