import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from '../../../services/camp-admin.service';

import { Manfun } from '../../../util/manfun';

import { Arbitro } from '../../../model/admin/arbitro';
import { Respuesta } from '../../../model/general/respuesta'
import { Catalogo } from '../../../model/admin/catalogo'

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent implements OnInit {

  arbitroForm: any;
  listaArbitros: Arbitro[];
  listaTipoIdentificaciones: Catalogo[] = [];
  arbitro: Arbitro;
  arbitroSeleccionado: Arbitro;
  mostrarPanelArbitro: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];

  constructor(private campAdminService: CampAdminService, private formBuild: FormBuilder) {
  
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(){
    this.campAdminService.obtenerArbitros(1).subscribe(
      arbitros =>{
        this.listaArbitros = arbitros;
      },
      err => {
        console.log(err);
      }
    );
  }


  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelArbitro = false;
      this.cargarDatosIniciales();
      this.arbitro = new Arbitro();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  mostrarConfirmacion(arbitro: Arbitro){
    this.mostrarPanelConf = true;
    this.arbitroSeleccionado = arbitro;
  }

  eliminarJugador(){
    this.campAdminService.eliminarArbitro(this.arbitroSeleccionado).subscribe(
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
