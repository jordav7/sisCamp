import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

@Component({
  selector: 'ld-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterContentChecked {

  CURRENT_PAGE: any = new CabeceraPagina();

  constructor(private location: Location) {

  }

  ngOnInit() {
    // console.log(this.location.prepareExternalUrl(this.location.path()));
  }

  ngAfterContentChecked() {
    if (sessionStorage.getItem('currentPage')) {
      this.CURRENT_PAGE = JSON.parse(sessionStorage.getItem('currentPage'));
    }
  }

}
