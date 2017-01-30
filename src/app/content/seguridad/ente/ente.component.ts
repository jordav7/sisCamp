import { Component, OnInit } from '@angular/core';

import { CampSeguridadService } from '../../../services/camp-seguridad.service';

import { Ente } from '../../../model/seguridad/ente';
import { Respuesta } from '../../../model/general/respuesta';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-ente',
  templateUrl: './ente.component.html',
  styleUrls: ['./ente.component.css']
})
export class EnteComponent implements OnInit {
  listaEntes: Ente[];
  ente: Ente;
  enteSeleccionado: Ente;
  mostrarPanelEnte: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];

  constructor(private campSeguridadService: CampSeguridadService) {
    this.ente = new Ente();
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(){
    this.campSeguridadService.obtenerEntes().subscribe(
      entes =>{
        this.listaEntes = entes;
      },
      err => {
        console.log(err);
      }
    );
  }

  guardarEnte(){
    if(this.esNuevo){
      this.campSeguridadService.crearEnte(this.ente).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.ente = new Ente();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.campSeguridadService.actualizarEnte(this.ente).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.ente = new Ente();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  seleccionarEnte(ente: Ente){
    this.esNuevo = false;
    this.ente = this.clonarEnte(ente);
    this.mostrarPanelEnte = true;
  }

  clonarEnte(e: Ente): Ente{
    let ente = new Ente();
    for(let prop in e){
      if(prop != "_$visited"){
        ente[prop] = e[prop];
      }
    }
    return ente;
  }

  mostrarDialogCrearEnte(){
    this.mostrarPanelEnte = true;
    this.esNuevo = true;
    this.ente = new Ente();
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelEnte = false;
      this.cargarDatosIniciales();
      this.ente = new Ente();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  mostrarConfirmacion(ente: Ente){
    this.mostrarPanelConf = true;
    this.enteSeleccionado = ente;
  }

  eliminarEnte(){
    this.campSeguridadService.eliminarEnte(this.enteSeleccionado).subscribe(
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
