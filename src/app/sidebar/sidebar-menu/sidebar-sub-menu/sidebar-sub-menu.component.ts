import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from 'app/model/seguridad/menu-item';

@Component({
  selector: '[ld-sidebar-sub-menu]',
  templateUrl: './sidebar-sub-menu.component.html',
  styleUrls: ['./sidebar-sub-menu.component.css']
})
export class SidebarSubMenuComponent implements OnInit {
  @Input() value: MenuItem;
  constructor() { }

  ngOnInit() {
  }

}
