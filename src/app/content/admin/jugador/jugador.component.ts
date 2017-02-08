import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from '../../../services/camp-admin.service';

import { Manfun } from '../../../util/manfun';

import { Jugador } from '../../../model/admin/jugador';
import { Respuesta } from '../../../model/general/respuesta'
import { Catalogo } from '../../../model/admin/catalogo'

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  jugadorForm: any;
  listaJugadores: Jugador[];
  listaTipoIdentificaciones: Catalogo[] = [];
  jugador: Jugador;
  jugadorSeleccionado: Jugador;
  mostrarPanelJugador: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];

  constructor(private campAdminService: CampAdminService, private formBuild: FormBuilder) {
    this.jugadorForm = this.cargarValidaciones();
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(){
    this.campAdminService.obtenerJugadores(1).subscribe(
      jugadores =>{
        this.listaJugadores = jugadores;
      },
      err => {
        console.log(err);
      }
    );
  }

  mostrarDialogCrearJugador(){
    this.mostrarPanelJugador = true;
    this.esNuevo = true;
    this.jugador = new Jugador();
    this.jugador.enteJuridico = 1;
    this.jugadorForm = this.cargarValidaciones();
  }

  cargarValidaciones(){
    return this.formBuild.group({
      'codigoPersona': '',
      'enteJuridico': '',
      'nombres': ['', Validators.required],
      'apellidoPaterno': ['', Validators.required],
      'apellidoMaterno': ['', Validators.required],
      'tipoId': '',//['', Validators.required],
      'identificacion': ['', Validators.required],
      'fechaNacimiento': ['', Validators.required],
      'sexo': ['', Validators.required],
      'direccion':'',
      'mail': ['', Validators.required],
      'telefono': ['', Validators.required],
      'celular': ['', Validators.required],
      'codigoPais': '',//['', Validators.required],
      'codigoProvincia': '',//['', Validators.required],
      'codigoCanton': '',//[, Validators.required],
      'codigoParroquia': '',//['', Validators.required],
      'codigoJugador': '',
      'amonestacion': ['', Validators.required],
      'estado': '',//['', Validators.required],
      'observaciones': '',
      'userMod': '',
      'userCrea':''
    });
  }

  guardarJugador(){
    this.jugador = this.jugadorForm.value;
    if(this.esNuevo){
      this.jugador.enteJuridico = 1;
      this.campAdminService.crearJugador(this.jugador).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.jugador = new Jugador();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.campAdminService.actualizarJugador(this.jugador).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.jugador = new Jugador();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  seleccionarJugador(jugador: Jugador){
    this.esNuevo = false;
    this.jugador = this.clonarJugador(jugador);
    this.mostrarPanelJugador = true;
    console.log(jugador.fechaNacimiento.toString());
    this.setValoresEdicion();
  }

  clonarJugador(j: Jugador): Jugador{
    let jugador = new Jugador();
    for(let prop in j){
      if(prop != "_$visited"){
        jugador[prop] = j[prop];
      }
    }
    return jugador;
  }

  setValoresEdicion(){
    this.jugadorForm.controls['codigoPersona'].setValue(this.jugador.codigoPersona);
    this.jugadorForm.controls['enteJuridico'].setValue(this.jugador.enteJuridico);
    this.jugadorForm.controls['codigoJugador'].setValue(this.jugador.codigoJugador);
    this.jugadorForm.controls['userMod'].setValue(this.jugador.userMod);
    this.jugadorForm.controls['userCrea'].setValue(this.jugador.userCrea);
    this.jugadorForm.controls['nombres'].setValue(this.jugador.nombres);
    this.jugadorForm.controls['apellidoPaterno'].setValue(this.jugador.apellidoPaterno);
    this.jugadorForm.controls['apellidoMaterno'].setValue(this.jugador.apellidoMaterno);
    this.jugadorForm.controls['tipoId'].setValue(this.jugador.tipoId);
    this.jugadorForm.controls['identificacion'].setValue(this.jugador.identificacion);
    this.jugadorForm.controls['fechaNacimiento'].setValue(Manfun.parseDate(this.jugador.fechaNacimiento.toLocaleString()));
    this.jugadorForm.controls['sexo'].setValue(this.jugador.sexo);
    this.jugadorForm.controls['mail'].setValue(this.jugador.mail);
    this.jugadorForm.controls['telefono'].setValue(this.jugador.telefono);
    this.jugadorForm.controls['celular'].setValue(this.jugador.celular);
    this.jugadorForm.controls['codigoPais'].setValue(this.jugador.codigoPais);
    this.jugadorForm.controls['codigoProvincia'].setValue(this.jugador.codigoProvincia);
    this.jugadorForm.controls['codigoCanton'].setValue(this.jugador.codigoCanton);
    this.jugadorForm.controls['codigoParroquia'].setValue(this.jugador.codigoParroquia);
    this.jugadorForm.controls['amonestacion'].setValue(this.jugador.amonestacion);
    this.jugadorForm.controls['estado'].setValue(this.jugador.estado);
    this.jugadorForm.controls['observaciones'].setValue(this.jugador.observaciones);
  }

  /**
    Copia valores de izquierda a derecha

  copiarValores(jugadorO: Jugador, jugadorC: Jugador): Jugador{
    for(let prop in jugadorC){
      if(prop != "_$visited"){
        jugadorO[prop] = jugadorC[prop];
      }
    }
    return jugadorO;
  }
  **/

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelJugador = false;
      this.cargarDatosIniciales();
      this.jugador = new Jugador();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  mostrarConfirmacion(jugador: Jugador){
    this.mostrarPanelConf = true;
    this.jugadorSeleccionado = jugador;
  }

  eliminarJugador(){
    this.campAdminService.eliminarJugador(this.jugadorSeleccionado).subscribe(
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
