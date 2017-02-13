import { Component, OnInit } from '@angular/core';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

@Component({
  selector: 'ld-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Inicio', '')));
  }

  ngOnInit() {
  }

}
