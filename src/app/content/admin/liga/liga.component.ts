import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from '../../../services/camp-admin.service';
import { CampSeguridadService } from '../../../services/camp-seguridad.service';

import { Parametro } from '../../../model/seguridad/parametro';
import { UbicacionGeografica } from '../../../model/admin/ubicacion-geografica';
import { Liga } from '../../../model/admin/liga';
import { Respuesta } from '../../../model/general/respuesta';

import { SisCampProperties } from '../../../propiedades';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit {
  ligaForm: any;
  mensajes: Message[] = [];
  listaLigas: Liga[] = [];
  liga: Liga;
  ligaSelecciona: Liga;
  listaEstados: Parametro[] = [];
  listaPaises: UbicacionGeografica[] = [];
  listaPronvincias: UbicacionGeografica[] = [];
  listaCantones: UbicacionGeografica[] = [];
  listaParroquias: UbicacionGeografica[] = [];
  respuesta: Respuesta;
  mostrarPanelLiga: boolean;
  mostrarPanelConf: boolean;
  esNuevo: boolean;
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campAdminService: CampAdminService, private formBuild: FormBuilder, private campSeguridadService: CampSeguridadService) {
    this.liga = new Liga();
    this.ligaForm = this.cargarValidaciones();
  }

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarValidaciones(){
    return this.formBuild.group({
      'codigoLiga': '',
      'enteJuridico': '',
      'nombres': ['', Validators.required],
      'codigoPais': ['', Validators.required],
      'codigoProvincia': ['', Validators.required],
      'codigoCanton': [, Validators.required],
      'codigoParroquia': ['', Validators.required],
      'estado': ['', Validators.required],
      'observaciones': '',
      'userMod': '',
      'userCrea':''
    });
  }

  cargarInformacionInicial() {
    this.cargarDatosTabla();
  }

  cargarDatosTabla() {
    this.campAdminService.obtenerLigas(this.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
      },
      err => {
        this.mostrarMensajeError(err);
      }
    );

    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.listaEstados = estados;
      },
      err => {
        this.mostrarMensajeError(err);
      }
    );
  }

  setValoresEdicion(){
    this.ligaForm.controls['codigoLiga'].setValue(this.liga.codigoLiga);
    this.ligaForm.controls['enteJuridico'].setValue(this.liga.enteJuridico);
    this.ligaForm.controls['userMod'].setValue(this.liga.userMod);
    this.ligaForm.controls['userCrea'].setValue(this.liga.userCrea);
    this.ligaForm.controls['nombres'].setValue(this.liga.nombres);
    this.ligaForm.controls['codigoPais'].setValue(this.liga.codigoPais);
    this.ligaForm.controls['codigoProvincia'].setValue(this.liga.codigoProvincia);
    this.ligaForm.controls['codigoCanton'].setValue(this.liga.codigoCanton);
    this.ligaForm.controls['codigoParroquia'].setValue(this.liga.codigoParroquia);
    this.ligaForm.controls['estado'].setValue(this.liga.estado);
    this.ligaForm.controls['observaciones'].setValue(this.liga.observaciones);
  }

  guardarLiga(){
    this.liga = this.ligaForm.value;
    this.liga.enteJuridico = this.CURRENT_USER.entejuridico;
    if (this.esNuevo) {
      this.campAdminService.crearLiga(this.liga).subscribe(
        respuesta => {
          this.respuesta = respuesta;
          this.procesarRespuesta(respuesta);
          this.liga = new Liga();
        },
        err => {
          this.mensajes = [];
          this.mensajes.push({severity:'error', summary:'Respuesta', detail: err});
        }
      );
    } else {
      this.campAdminService.actualizarLiga(this.liga).subscribe(
        respuesta => {
          this.respuesta = respuesta;
          this.procesarRespuesta(respuesta);
          this.liga = new Liga();
        },
        err => {
          this.mensajes = [];
          this.mensajes.push({severity:'error', summary:'Respuesta', detail: err});
        }
      );
    }
  }

  eliminarLiga(){
    this.campAdminService.eliminarLiga(this.ligaSelecciona).subscribe(
      respuesta => {
        this.respuesta = respuesta;
        this.procesarRespuestaBorrado(respuesta);
      },
      err => {
        this.mensajes = [];
        this.mensajes.push({severity:'error', summary:'Respuesta', detail: err});
      }
    );
  }

  cargarPaises(){
    this.campAdminService.obtenerUbicacionesPorCategoria(SisCampProperties.codigoTipoUbicacionPais).subscribe(
      paises => {
        this.listaPaises = paises;
      },
      err => {
        this.mostrarMensajeError(err);
      }
    );
  }

  cargarProvincias(){
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.ligaForm.value.codigoPais, SisCampProperties.codigoTipoUbicacionProv).subscribe(
      provincias => {
        this.listaPronvincias = provincias;
      },
      err => {
        this.mostrarMensajeError(err);
      }
    );
  }

  cargarCantones(){
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.ligaForm.value.codigoProvincia, SisCampProperties.codigoTipoUbicacionCanton).subscribe(
      cantones => {
        this.listaCantones = cantones;
      },
      err => {
        this.mostrarMensajeError(err);
      }
    );
  }

  cargarParroquias(){
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.ligaForm.value.codigoCanton, SisCampProperties.codigoTipoUbicacionParroquia).subscribe(
      parroquias => {
        this.listaParroquias = parroquias;
      },
      err => {
        this.mostrarMensajeError(err);
      }
    );
  }

  seleccionarLiga(liga: Liga) {
      this.esNuevo = false;
      this.liga = this.clonarLiga(liga);
      this.setValoresEdicion();
      this.cargarUbicaciones();
      this.mostrarPanelLiga = true;
  }

  cargarUbicaciones() {
    this.cargarPaises();
    this.cargarProvincias();
    this.cargarCantones();
    this.cargarParroquias();
  }

  clonarLiga(l: Liga): Liga{
    let liga = new Liga();
    for(let prop in l){
      if(prop != "_$visited"){
        liga[prop] = l[prop];
      }
    }
    return liga;
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelLiga = false;
      this.cargarDatosTabla();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  procesarRespuestaBorrado(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelConf = false;
      this.cargarDatosTabla();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'El registro fue eliminado exitosamente'});
    }
  }

  mostrarMensajeError(err: string){
    this.mensajes = [];
    this.mensajes.push({severity:'error', summary:'Respuesta', detail: err});
  }

  mostrarDialogCrearLiga(){
    this.mostrarPanelLiga = true;
    this.esNuevo = true;
    this.cargarPaises();
  }

  mostrarConfirmacion(liga: Liga){
    this.mostrarPanelConf = true;
    this.ligaSelecciona = liga;
  }

}
