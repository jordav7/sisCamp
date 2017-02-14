import { Component, OnInit } from '@angular/core';
import { CampSeguridadService } from '../../../services/camp-seguridad.service';

import { Usuario } from '../../../model/seguridad/usuario';
import { Respuesta } from '../../../model/general/respuesta';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  listaUsuarios: Usuario[];
  usuario: Usuario;
  usuarioSeleccionado: Usuario;
  mostrarPanelUsuario: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];

  constructor(private campSeguridadService: CampSeguridadService) {
    this.usuario = new Usuario();
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Usuario', 'Gesti\u00f3n de Usuarios')));
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(){
    this.campSeguridadService.obtenerJugadores(1).subscribe(
      usuarios =>{
        this.listaUsuarios = usuarios;
      },
      err => {
        console.log(err);
      }
    );
  }

  mostrarDialogCrearUsuario(){
    this.mostrarPanelUsuario = true;
    this.esNuevo = true;
    this.usuario = new Usuario();
    this.usuario.enteJuridico = 1;
  }

  guardarUsuario(){
    if(this.esNuevo){
      this.campSeguridadService.crearUsuario(this.usuario).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.usuario = new Usuario();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.campSeguridadService.actualizarUsuario(this.usuario).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.usuario = new Usuario();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  seleccionarUsuario(usuario: Usuario){
    this.esNuevo = false;
    this.usuario = this.clonarUsuario(usuario);
    this.mostrarPanelUsuario = true;
  }

  clonarUsuario(u: Usuario): Usuario{
    let usuario = new Usuario();
    for(let prop in u){
      if(prop != "_$visited"){
        usuario[prop] = u[prop];
      }
    }
    return usuario;
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelUsuario = false;
      this.cargarDatosIniciales();
      this.usuario = new Usuario();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  mostrarConfirmacion(usuario: Usuario){
    this.mostrarPanelConf = true;
    this.usuarioSeleccionado = usuario;
  }

  eliminarUsuario(){
    this.campSeguridadService.eliminarUsuario(this.usuarioSeleccionado).subscribe(
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
