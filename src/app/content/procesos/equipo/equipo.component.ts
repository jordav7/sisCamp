import { Component, OnInit } from '@angular/core';

import { Equipo } from 'app/model/procesos/equipo';
import { Respuesta } from 'app/model/general/respuesta';
import { Liga } from 'app/model/admin/liga';
import { CampProcesosService } from 'app/services/camp-procesos.service';
import { CampAdminService } from 'app/services/camp-admin.service';
import { CampSeguridadService } from '../../../services/camp-seguridad.service';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
import { SisCampProperties } from '../../../propiedades';

import { Message, SelectItem } from 'primeng/primeng';

@Component({
  selector: 'ld-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  mensajes: Message[] = [];
  listaEquipos: Equipo[] = [];
  equipoSeleccionado: Equipo;
  mostrarPanelConf: boolean;
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));
  filtroLigas: SelectItem[];
  filtroDisciplinas: SelectItem[];
  filtroEstados: SelectItem[];
  filtroInterligas: SelectItem[];

  constructor(private campProcesosService: CampProcesosService, private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService) {
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Equipos', 'Gesti\u00f3n de Equipos')));
  }

  ngOnInit() {
      this.cargarDatosIniciales();
      this.cargarLigas();
      this.cargarDisciplinas();
      this.cargarEstados();
      this.cargarInterligas();
  }

  cargarDatosIniciales() {
      this.campProcesosService.obtenerEquipos(this.CURRENT_USER.entejuridico, this.CURRENT_USER.codigoLiga).subscribe(
         equipos => {
             this.listaEquipos = equipos;
         }
      );
  }

  cargarLigas(){
    this.campAdminService.obtenerLigas(this.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.procesarLigas(ligas);
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  procesarLigas(listaLigas: Liga[]){
    this.filtroLigas = [];
    listaLigas.forEach(
      liga => {
        this.filtroLigas.push({label: liga.nombres, value: liga.nombres});
      });
  }

  cargarDisciplinas(){
    this.campAdminService.obtenerCatalogos(this.CURRENT_USER.entejuridico, SisCampProperties.codigoTipoDisciplina).subscribe(
      disciplinas => {
        this.filtroDisciplinas = [];
        disciplinas.forEach(
          disciplina => {
            this.filtroDisciplinas.push({label: disciplina.nombre, value: disciplina.nombre});
        });
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarEstados(){
    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.filtroEstados = [];
        estados.forEach(
          estado => {
            this.filtroEstados.push({label: estado.nombre, value: estado.id});
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarInterligas(){
    this.filtroInterligas = [];
    this.filtroInterligas.push({label: 'Si', value: 'S'});
    this.filtroInterligas.push({label: 'No', value: 'N'});
  }

  mostrarConfirmacion(equipo: Equipo){
    this.mostrarPanelConf = true;
    this.equipoSeleccionado = equipo;
  }

  eliminarEquipo(){
    this.campProcesosService.eliminarEquipo(this.equipoSeleccionado).subscribe(
      respuesta => {
        this.procesarRespuestaBorrado(respuesta);
      },
      err => {
        console.log(err);
      }
    );
  }

  procesarRespuestaBorrado(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelConf = false;
      this.cargarDatosIniciales();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'El registro fue eliminado exitosamente'});
    }
  }

  procesarRespuestaError(error: string) {
    this.mensajes = [];
    this.mensajes.push({severity: 'error', summary: 'Respuesta', detail: error});
  }

  crearEquipoClon (equipo: Equipo) {
    
  }

}
