import { Component, OnInit } from '@angular/core';

import { Equipo } from 'app/model/procesos/equipo';
import { CampProcesosService } from 'app/services/camp-procesos.service';

@Component({
  selector: 'ld-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  listaEquipos: Equipo[] = [];
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campProcesosService: CampProcesosService) { }

  ngOnInit() {
      this.cargarDatosIniciales();
  }
  
  cargarDatosIniciales() {
      this.campProcesosService.obtenerEquipos(this.CURRENT_USER.entejuridico, this.CURRENT_USER.codigoLiga).subscribe(
         equipos => {
             this.listaEquipos = equipos;
         }
      );
  }

}
