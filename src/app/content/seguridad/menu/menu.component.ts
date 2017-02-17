import { Component, OnInit } from '@angular/core';

import { Rol } from 'app/model/seguridad/rol';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
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
  constructor(private campSeguridadService: CampSeguridadService) {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Men\u00fa', 'Gesti\u00f3n de Men\u00fa')));
  }

  ngOnInit() {
    this.inicializaDatos();
  }

  inicializaDatos() {
    this.cargarArbolMenu();
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

}
