import { Component } from '@angular/core';
import { CampAdminService } from './services/camp-admin.service';
import { CampSeguridadService } from './services/camp-seguridad.service';
import { AuthenticationService } from './services/authentication.service';
import { CampProcesosService } from './services/camp-procesos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CampAdminService, CampSeguridadService, AuthenticationService, CampProcesosService]
})
export class AppComponent {
  loggedIn: boolean=false;
  constructor(){}
}
