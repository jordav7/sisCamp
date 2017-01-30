import { Component, OnInit } from '@angular/core';
import { CampSeguridadService } from '../../../services/camp-seguridad.service';

import { Usuario } from '../../../model/seguridad/usuario';
import { Respuesta } from '../../../model/general/respuesta';

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
  }

  ngOnInit() {
  }

}
