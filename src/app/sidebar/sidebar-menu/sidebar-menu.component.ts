import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from 'app/model/seguridad/menu-item';

@Component({
  selector: '[ld-sidebar-menu]',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  @Input() headerMenu: string = 'MENU';
  @Input() value: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
