import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

import { Parametro } from '../../../../model/seguridad/parametro';
import { Liga } from 'app/model/admin/liga';
import { Catalogo } from 'app/model/admin/catalogo';

import { Message } from 'primeng/primeng';

import { CampAdminService } from 'app/services/camp-admin.service';
import { CampSeguridadService } from '../../../../services/camp-seguridad.service';
import { CampReportesService } from 'app/services/camp-reportes.service';

import { SisCampProperties } from '../../../../propiedades';

@Component({
  selector: 'ld-reporte-jugador',
  templateUrl: './reporte-jugador.component.html',
  styleUrls: ['./reporte-jugador.component.css']
})
export class ReporteJugadorComponent implements OnInit {
  listaEstados: Parametro[] = [];
  listaLigas: Liga[];
  listaDisciplina: Catalogo[];
  mensajes: Message[] = [];
  private static CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService, private campReportesService: CampReportesService) {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Reportes', 'Jugadores')));
  }

  ngOnInit() {
    this.cargarCatalogos();
    this.cargarDisciplinas();
    this.cargarLigas();
  }

  cargarCatalogos(){
    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.listaEstados = estados;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarLigas(){
    this.campAdminService.obtenerLigas(ReporteJugadorComponent.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarDisciplinas(){
    this.campAdminService.obtenerCatalogos(ReporteJugadorComponent.CURRENT_USER.entejuridico, SisCampProperties.codigoTipoDisciplina).subscribe(
      disciplinas => {
        this.listaDisciplina = disciplinas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  procesarRespuestaError(error: string) {
    this.mensajes = [];
    this.mensajes.push({severity: 'error', summary: 'Respuesta', detail: error});
  }

  generarReporte(){
    this.campReportesService.downloadFile();
  }
}
