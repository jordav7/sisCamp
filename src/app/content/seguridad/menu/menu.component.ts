import { Component, OnInit } from '@angular/core';

import { Rol } from 'app/model/seguridad/rol';
import { RolMenu } from 'app/model/seguridad/rol-menu';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
import { Respuesta } from 'app/model/general/respuesta';
import { Message, TreeNode } from 'primeng/primeng';

import { CampSeguridadService } from 'app/services/camp-seguridad.service';

@Component({
  selector: 'ld-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  mensajes: Message[] = [];
  listaMenu: TreeNode[];
  listaRoles: Rol[];
  menusSeleccionados: TreeNode[];
  CURRENT_USER = JSON.parse(localStorage.getItem('currentUser'));
  respuesta: Respuesta;
  codigoRol: number;
  nodoEncontrado: any;
  constructor(private campSeguridadService: CampSeguridadService) {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Men\u00fa', 'Gesti\u00f3n de Men\u00fa')));
  }

  ngOnInit() {
    this.inicializaDatos();
  }

  inicializaDatos() {
    this.cargarRoles();
    this.cargarArbolMenu();
  }

  cargarRoles() {
    this.campSeguridadService.obtenerRoles(this.CURRENT_USER.entejuridico).subscribe(
      roles => {
        this.listaRoles = roles;
      }, err => {
        console.log(err);
      }
    );
  }

  cargarArbolMenu() {
    this.campSeguridadService.obtenerMenu(this.CURRENT_USER.entejuridico).subscribe(
      menus => {
        this.listaMenu = menus;
      },
      err => {
        console.log(err);
      }
    );
  }

  cambiarRol() {
    console.log('el codigo seleccionado es ' + this.codigoRol);
    this.campSeguridadService.obtenerMenuRol(this.CURRENT_USER.entejuridico, this.codigoRol).subscribe(
      menusRol => {
        console.log('Entra a cargar menus');
        this.seleccionarMenus(menusRol);
      },
      err => {
        console.log(err);
      }
    );
  }

  seleccionarMenus(menusRol: TreeNode[]) {
    this.menusSeleccionados = [];
    for (let menuRol of menusRol) {
      this.nodoEncontrado = null;
      let nodoSeleccionado = this.obtenerTreeNode(menuRol, this.listaMenu);
      this.menusSeleccionados.push(nodoSeleccionado);
    }
    console.log(this.menusSeleccionados);
  }

  guardarMenuRol() {
    let rolMenus = [];
    for(let treeNode of this.menusSeleccionados) {
      let rolMenu = new RolMenu(this.CURRENT_USER.entejuridico, +treeNode.data, treeNode.label, this.codigoRol, null, null, null, null);
      rolMenus.push(rolMenu);
    }
    this.campSeguridadService.guardarMenuRol(rolMenus).subscribe(
      respuesta => {
        this.respuesta = respuesta;
      }, err => {
        console.log(err);
      }
    );
  }

  obtenerTreeNode(nodoEnviado: TreeNode, listaNodos: any[]): TreeNode {
    for (let nodoMenu of listaNodos) {
      if (+nodoEnviado.data === +nodoMenu.data) {
        this.nodoEncontrado = nodoMenu;
        break;
      } else {
        this.nodoEncontrado = this.obtenerTreeNode(nodoEnviado, nodoMenu.children);
      }
    }
    return this.nodoEncontrado;
  }

}
