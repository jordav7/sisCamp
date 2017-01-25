import { Component } from '@angular/core';
import {SisCampService} from './services/sis-camp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SisCampService]
})
export class AppComponent {

  constructor(private sisCampService: SisCampService){}
}
