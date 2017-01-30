import { Component, OnInit } from '@angular/core';
import { CampSeguridadService } from '../../../services/camp-seguridad.service';

import { Rol } from '../../../model/seguridad/rol';
import { Respuesta } from '../../../model/general/respuesta';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  listaRoles: Rol[];
  rol: Rol;
  rolSeleccionado: Rol;
  mostrarPanelRol: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];

  constructor(private campSeguridadService: CampSeguridadService) {
    this.rol = new Rol();
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(){
    this.campSeguridadService.obtenerRoles(1).subscribe(
      roles =>{
        this.listaRoles = roles;
      },
      err => {
        console.log(err);
      }
    );
  }

  mostrarDialogCrearRol(){
    this.mostrarPanelRol = true;
    this.esNuevo = true;
    this.rol = new Rol();
    this.rol.enteJuridico = 1;
  }

  guardarRol(){
    if(this.esNuevo){
      this.campSeguridadService.crearRol(this.rol).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.rol = new Rol();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.campSeguridadService.actualizarRol(this.rol).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.rol = new Rol();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  seleccionarRol(rol: Rol){
    this.esNuevo = false;
    this.rol = this.clonarRol(rol);
    this.mostrarPanelRol = true;
  }

  clonarRol(r: Rol): Rol{
    let rol = new Rol();
    for(let prop in r){
      if(prop != "_$visited"){
        rol[prop] = r[prop];
      }
    }
    return rol;
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelRol = false;
      this.cargarDatosIniciales();
      this.rol = new Rol();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  mostrarConfirmacion(rol: Rol){
    this.mostrarPanelConf = true;
    this.rolSeleccionado = rol;
  }

  eliminarRol(){
    this.campSeguridadService.eliminarRol(this.rolSeleccionado).subscribe(
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
