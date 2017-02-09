import { Component, OnInit } from '@angular/core';

import { Equipo } from 'app/model/procesos/equipo';
import { Respuesta } from 'app/model/general/respuesta';
import { CampProcesosService } from 'app/services/camp-procesos.service';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  mensajes: Message[] = [];
  listaEquipos: Equipo[] = [];
  equipoSeleccionado: Equipo;
  mostrarPanelConf: boolean;
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

  mostrarConfirmacion(equipo: Equipo){
    this.mostrarPanelConf = true;
    this.equipoSeleccionado = equipo;
  }

  eliminarEquipo(){
    this.campProcesosService.eliminarEquipo(this.equipoSeleccionado).subscribe(
      respuesta => {
        this.procesarRespuestaBorrado(respuesta);
      },
      err => {
        console.log(err);
      }
    );
  }

  procesarRespuestaBorrado(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelConf = false;
      this.cargarDatosIniciales();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'El registro fue eliminado exitosamente'});
    }
  }

}
