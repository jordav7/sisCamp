import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'app/model/seguridad/menu-item';

@Component({
  selector: 'ld-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menus: any[];
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));
  constructor() {
    this.menus = [{title: 'Seguridades',
      route: '',
      childrens: [
        {title: 'Registro Ente', route: 'ente', childrens: []},
        {title: 'Registro de Usuarios', route: 'usuario', childrens: []},
        {title: 'Gestion de Roles', route: 'roles', childrens: []},
        {title: 'Configuracion Menus', route: '#', childrens: []},
        {title: 'Parametros Generales', route: 'parametro', childrens: []}
      ]}];
  }

  ngOnInit() {
  }

}
