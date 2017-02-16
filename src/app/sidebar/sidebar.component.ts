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
    this.menus = [
      {
        title: 'Seguridades',
        route: '',
        childrens: [
          {title: 'Registro Ente', route: 'ente', childrens: []},
          {title: 'Registro de Usuarios', route: 'usuario', childrens: []},
          {title: 'Gesti\u00f3n de Roles', route: 'roles', childrens: []},
          {title: 'Configuraci\u00f3n Men\u00fas', route: '#', childrens: []},
          {title: 'Par\u00e1metros Generales', route: 'parametro', childrens: []}
        ]
      },
      {
        title: 'Administraci\u00f3n',
        route: '',
        childrens: [
          {title: 'Cat\u00e1logos', route: 'catalogo', childrens: []},
          {title: 'Registro Ligas', route: 'ligas', childrens: []},
          {title: 'Registro Jugadores', route: 'jugador', childrens: []},
          {title: 'Registro \u00c1rbitro', route: 'arbitro', childrens: []},
          {title: 'Ubicaci\u00f3n Geogr\u00e1fica', route: 'ubicacionGeografica', childrens: []}
        ]
      },
      {
        title: 'Procesos',
        route: '',
        childrens: [
          {title: 'Registro Equipos', route: 'equipos', childrens: []}
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
