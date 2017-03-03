import { Component, OnInit } from '@angular/core';

import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
import { VistaJugador } from 'app/model/reportes/vista-jugador';

import { CampReportesService } from 'app/services/camp-reportes.service';

@Component({
  selector: 'ld-consulta-jugador',
  templateUrl: './consulta-jugador.component.html',
  styleUrls: ['./consulta-jugador.component.css']
})
export class ConsultaJugadorComponent implements OnInit {

  identificacion: string;
  nombres: string;
  listaJugadores: VistaJugador[] = [];

  constructor(private campReportesService: CampReportesService) { }

  ngOnInit() {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('','')));
  }

  consultarJugadores(){
    this.campReportesService.consultaJugadores({enteJuridico: 1, identificacion: this.identificacion, nombres: this.nombres}).subscribe(
      jugadores => {
        this.listaJugadores = jugadores;
      }
    );
  }
}
