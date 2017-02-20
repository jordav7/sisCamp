import { Component, OnInit } from '@angular/core';
import { Parametro } from '../../../../model/seguridad/parametro';
import { Liga } from 'app/model/admin/liga';
import { Catalogo } from 'app/model/admin/catalogo';

import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

import { CampAdminService } from 'app/services/camp-admin.service';
import { CampSeguridadService } from '../../../../services/camp-seguridad.service';

import { SisCampProperties } from '../../../../propiedades';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-campeonato-edit',
  templateUrl: './campeonato-edit.component.html',
  styleUrls: ['./campeonato-edit.component.css']
})
export class CampeonatoEditComponent implements OnInit {
  listaEstados: Parametro[] = [];
  listaLigas: Liga[];
  listaDisciplina: Catalogo[];
  mensajes: Message[] = [];

  private static CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService) { }

  ngOnInit() {
    this.cargarCatalogos();
    this.cargarDisciplinas();
  }

  guardarCampeonato(){

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
    this.campAdminService.obtenerLigas(CampeonatoEditComponent.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarDisciplinas(){
    this.campAdminService.obtenerCatalogos(CampeonatoEditComponent.CURRENT_USER.entejuridico, SisCampProperties.codigoTipoDisciplina).subscribe(
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
}
