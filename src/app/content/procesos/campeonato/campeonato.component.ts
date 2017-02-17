import { Component, OnInit } from '@angular/core';
import { Campeonato } from 'app/model/procesos/campeonato';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {
  mensajes: Message[] = [];
  listaCampeonato: Campeonato[] = [];
  campeonatoSeleccionado: Campeonato;
  mostrarPanelConf: boolean;
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor() {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Campeonatos', 'Gesti\u00f3n de Campeonatos')));
  }

  ngOnInit() {
  }

  eliminarCampeonato(){

  }

  mostrarConfirmacion(campeonato: Campeonato){

  }

}
