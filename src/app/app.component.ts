import { Component } from '@angular/core';
import { CampAdminService } from './services/camp-admin.service';
import { CampSeguridadService } from './services/camp-seguridad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CampAdminService, CampSeguridadService]
})
export class AppComponent {

  constructor(){}
}
