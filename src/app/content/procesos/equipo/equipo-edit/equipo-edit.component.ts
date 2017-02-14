import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from 'app/services/camp-admin.service';
import { CampSeguridadService } from 'app/services/camp-seguridad.service';
import { CampProcesosService } from 'app/services/camp-procesos.service';
import { Catalogo } from 'app/model/admin/catalogo';
import { Liga } from 'app/model/admin/liga';
import { Parametro } from 'app/model/seguridad/parametro';
import { Equipo } from 'app/model/procesos/equipo';
import { Respuesta } from 'app/model/general/respuesta';
import { SisCampProperties } from 'app/propiedades';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

import { Message } from 'primeng/primeng';

import { EquipoJugador } from 'app/model/procesos/equipo-jugador';

@Component({
  selector: 'ld-equipo-edit',
  templateUrl: './equipo-edit.component.html',
  styleUrls: ['./equipo-edit.component.css']
})
export class EquipoEditComponent implements OnInit {
  @ViewChild('btnCerrarEquipoJug') btnCerrarEquipoJug: ElementRef;
  mensajes: Message[] = [];
  listaDisciplina: Catalogo[];
  listaEstados: Parametro[];
  listaLigas: Liga[];
  esNuevo: boolean;
  equipoForm: any;
  equipo: Equipo;

  //Variables EquipoJugador
  equipoJugadorForm: any;
  equipoJugador: EquipoJugador;
  listaEquipos: Equipo[];

  private static CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService,
    private campProcesosService: CampProcesosService,private formBuild: FormBuilder, private route: ActivatedRoute) {
      sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Equipos', 'Gesti\u00f3n de Equipos')));
    }

  ngOnInit() {
    this.cargarDatosIniciales();
    this.cargarDatosEntidad();

    //EquipoJugador
    this.cargarDatosEquipoJugador();
  }

  cargarDatosIniciales() {
    this.cargarDisciplinas();
    this.cargarLigas();
    this.cargarEstados();
  }

  cargarDatosEntidad() {
    this.equipoForm = this.cargarValidaciones();
    this.route.params.subscribe(
      params => {
        if(params['enteJuridico'] && params['codigoEquipo']) {
          this.esNuevo = false;
          this.campProcesosService.obtenerEquipo(+params['enteJuridico'], + params['codigoEquipo']).subscribe(
            equipo => {
              this.equipo = equipo;
              this.setValoresEdicion();
            }
          );
        } else {
          this.esNuevo = true;
          this.equipo = new Equipo();
          this.equipo.enteJuridico = EquipoEditComponent.CURRENT_USER.entejuridico;
          this.equipo.codigoLiga = EquipoEditComponent.CURRENT_USER.codigoLiga;
          this.equipoForm.controls['codigoLiga'].setValue(EquipoEditComponent.CURRENT_USER.codigoLiga);
        }
      }
    );
  }

  cargarValidaciones() {
    return this.formBuild.group({
      'codigoEquipo': '',
      'enteJuridico': '',
      'nombres': ['', Validators.required],
      'numJugadores': ['', Validators.required],
      'estado': ['', Validators.required],
      'userCrea': '',
      'userMod': '',
      'codigoLiga': [{value: '', disabled: true}, Validators.required],
      'codigoDisciplina': ['', Validators.required],
      'codigoTipoDisciplina':''
    });
  }

  cargarDisciplinas(){
    this.campAdminService.obtenerCatalogos(EquipoEditComponent.CURRENT_USER.entejuridico, SisCampProperties.codigoTipoDisciplina).subscribe(
      disciplinas => {
        this.listaDisciplina = disciplinas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarLigas(){
    this.campAdminService.obtenerLigas(EquipoEditComponent.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarEstados(){
    this.campSeguridadService.obtenerParametrosPorTipo(EquipoEditComponent.CURRENT_USER.entejuridico, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.listaEstados = estados;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  setValoresEdicion() {
    this.equipoForm.setValue(this.equipo);
  }

  guardarEquipo() {
    this.equipo = this.equipoForm.value;
    this.equipo.enteJuridico = EquipoEditComponent.CURRENT_USER.entejuridico;
    this.equipo.codigoLiga = EquipoEditComponent.CURRENT_USER.codigoLiga;
    if(this.esNuevo) {
      this.campProcesosService.crearEquipo(this.equipo).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
        },
        err => {
          this.procesarRespuestaError(err);
        }
      );
    } else {
      this.campProcesosService.actualizarEquipo(this.equipo).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
        },
        err => {
          this.procesarRespuestaError(err);
        }
      );
    }
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
      this.esNuevo = false;
      this.equipoForm.controls['codigoEquipo'].setValue(+respuesta.mensaje);
    } else {
      this.mensajes = [];
      this.mensajes.push({severity:'error', summary:'Respuesta', detail:respuesta.mensaje});
    }
  }

  procesarRespuestaError(error: string) {
    this.mensajes = [];
    this.mensajes.push({severity: 'error', summary: 'Respuesta', detail: error});
  }

  guardarEquipoJugador() {
    this.btnCerrarEquipoJug.nativeElement.click();
  }

  /*
  Empieza equipo jugador
  */
  cargarDatosEquipoJugador() {
    this.cargarValoresEquipoJugador();
    this.cargarValidacionesEquipoJugador();
  }

  cargarValoresEquipoJugador() {
    this.cargarEquipos();
  }

  cargarValidacionesEquipoJugador() {
    this.equipoJugadorForm = this.formBuild.group({
      'codigoEquipoJugador': '',
      'enteJuridico': EquipoEditComponent.CURRENT_USER.enteJuridico,
      'codigoEquipo': [{value: this.equipoForm.controls.codigoEquipo.value, disabled: true}],
      'equipoNombre': '',
      'ligaEquipo': [{value: EquipoEditComponent.CURRENT_USER.codigoLiga, disabled: true}],
      'nombreLiga': '',
      'codigoJugador': '',
      'nombresJugador': '',
      'numeroJugador': '',
      'esCapitan': '',
      'esJugador': '',
      'esDt': '',
      'estado': '',
      'userCrea': '',
      'userMod': ''
    });
  }

  cargarEquipos() {
    this.campProcesosService.obtenerEquipos(EquipoEditComponent.CURRENT_USER.entejuridico, EquipoEditComponent.CURRENT_USER.codigoLiga).subscribe(
      equipos => {
        this.listaEquipos = equipos;
      }
    );
  }

}
