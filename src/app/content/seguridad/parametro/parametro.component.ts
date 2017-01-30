import { Component, OnInit } from '@angular/core';

import { CampSeguridadService } from '../../../services/camp-seguridad.service';

import { Parametro } from '../../../model/seguridad/parametro';
import { Respuesta } from '../../../model/general/respuesta';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {
  listaParametros: Parametro[];
  parametro: Parametro;
  parametroSeleccionado: Parametro;
  esNuevo: boolean = false;
  mostrarPanelParam: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];

  constructor(private campSeguridadService: CampSeguridadService) {
    this.parametro = new Parametro();
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(){
    this.campSeguridadService.obtenerParametros(1).subscribe(
      parametros =>{
        this.listaParametros = parametros;
      },
      err =>{
        console.log(err);
      }
    );
  }

  guardarParametro(){
    if(this.esNuevo){
      this.campSeguridadService.crearParametro(this.parametro).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.parametro = new Parametro();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.campSeguridadService.actualizarParametro(this.parametro).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.parametro = new Parametro();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  eliminarParametro(){
    this.campSeguridadService.eliminarParametro(this.parametroSeleccionado).subscribe(
      respuesta => {
        this.procesarRespuestaBorrado(respuesta);
      },
      err => {
        console.log(err);
      }
    );
  }

  mostrarDialogCrearParam(){
    this.mostrarPanelParam = true;
    this.esNuevo = true;
    this.parametro = new Parametro();
    this.parametro.enteJuridico = 1;
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelParam = false;
      this.cargarDatosIniciales();
      this.parametro = new Parametro();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  seleccionarParametro(parametro: Parametro){
    this.esNuevo = false;
    this.parametro = this.clonarParametro(parametro);
    this.mostrarPanelParam = true;
  }

  clonarParametro(p: Parametro): Parametro{
    let parametro = new Parametro();
    for(let prop in p){
      if(prop != "_$visited"){
        parametro[prop] = p[prop];
      }
    }
    return parametro;
  }

  mostrarConfirmacion(parametro: Parametro){
    this.mostrarPanelConf = true;
    this.parametroSeleccionado = parametro;
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
