import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ld-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));
  constructor() { }

  ngOnInit() {
  }

}
