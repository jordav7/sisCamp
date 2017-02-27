import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

import { Parametro } from '../../../../model/seguridad/parametro';
import { Liga } from 'app/model/admin/liga';
import { Equipo } from 'app/model/procesos/equipo'
import { Catalogo } from 'app/model/admin/catalogo';

import { Message } from 'primeng/primeng';

import { CampAdminService } from 'app/services/camp-admin.service';
import { CampSeguridadService } from '../../../../services/camp-seguridad.service';
import { CampReportesService } from 'app/services/camp-reportes.service';
import { CampProcesosService } from '../../../../services/camp-procesos.service';

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
  listaEquipos: Equipo[];

  //filtros
  edad: number;
  codigoDisciplina: number;
  parroquia: string;
  equipo: number;
  codigoLiga: number;
  estado: string;
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService, private campReportesService: CampReportesService, private campProcesosService: CampProcesosService) {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Reportes', 'Equipos')));
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
    this.campAdminService.obtenerLigas(this.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
        this.codigoLiga = this.CURRENT_USER.codigoLiga;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarEquipos(){
    this.campProcesosService.obtenerEquiposActivos(this.CURRENT_USER.entejuridico, this.codigoLiga).subscribe(
      equipos => {
        this.listaEquipos = equipos;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarDisciplinas(){
    this.campAdminService.obtenerCatalogos(this.CURRENT_USER.entejuridico, SisCampProperties.codigoTipoDisciplina).subscribe(
      disciplinas => {
        this.listaDisciplina = disciplinas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarEquiposLiga () {
    this.campProcesosService.obtenerEquiposActivos(this.CURRENT_USER.entejuridico, this.codigoLiga).subscribe(
      equipos => {
        this.listaEquipos = equipos;
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
    this.campReportesService.downloadFile({edad: this.edad, codigoDisciplina: this.codigoDisciplina,
      parroquia: this.parroquia, equipo: this.equipo,
      codigoLiga: this.codigoLiga, estado: this.estado});
  }
}
