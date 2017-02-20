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
import { UbicacionGeografica } from 'app/model/admin/ubicacion-geografica';

import { Message } from 'primeng/primeng';

import {IMyOptions} from 'mydatepicker';

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
  verJugador: boolean;
  verInteligas: boolean;
  edad: number;
  listaPaises: UbicacionGeografica[] = [];
  listaPronvincias: UbicacionGeografica[] = [];
  listaCantones: UbicacionGeografica[] = [];
  listaParroquias: UbicacionGeografica[] = [];
  private opcionesCalendario: IMyOptions = {dateFormat: 'dd-mm-yyyy'};

  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService,
    private campProcesosService: CampProcesosService,private formBuild: FormBuilder, private route: ActivatedRoute) {
      sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Equipos', 'Gesti\u00f3n de Equipos')));
    }

  ngOnInit() {
    this.cargarDatosIniciales();
    this.cargarDatosEntidad();
    //EquipoJugador
    console.log('Cargar equipos jugador');
    this.cargarDatosEquipoJugador();
    console.log('Termina de cargar equipos jugador');
  }

  cargarDatosIniciales() {
    this.cargarDisciplinas();
    this.cargarLigas();
    this.cargarEstados();
    this.cargarUbicaciones();
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
              console.log('termina de cargar valores')
            }
          );
        } else {
          this.esNuevo = true;
          this.equipo = new Equipo();
          this.equipo.enteJuridico = this.CURRENT_USER.entejuridico;
          this.equipo.codigoLiga = this.CURRENT_USER.codigoLiga;
          this.equipo.estado = 'A';
          this.equipoForm.controls['codigoLiga'].setValue(this.CURRENT_USER.codigoLiga);
        }
      }
    );
    this.route.queryParams.subscribe(
      params => {
        if(params['display']){
          this.verJugador = true;
        }else{
          this.verJugador = false;
        }

        if(params['displayInterligas']){
          this.verInteligas = true;
        }else{
          this.verInteligas = false;
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
      'estado': '',//['', Validators.required],
      'userCrea': '',
      'userMod': '',
      'codigoLiga': [{value: '', disabled: this.CURRENT_USER.codigoLiga ? true : false}, Validators.required],
      'codigoDisciplina': ['', Validators.required],
      'codigoTipoDisciplina': SisCampProperties.codigoTipoDisciplina,
      'liga': '',
      'disciplina': '',
      'interligas': '',
      'codigoEquipoClon': ''
    });
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

  cargarLigas(){
    this.campAdminService.obtenerLigas(this.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

  cargarEstados(){
    this.campSeguridadService.obtenerParametrosPorTipo(this.CURRENT_USER.entejuridico, SisCampProperties.codigoCatalogoEstado).subscribe(
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
    this.equipoJugadorForm.controls.codigoEquipo.setValue(this.equipo.codigoEquipo);
  }

  guardarEquipo() {
    this.equipo = this.equipoForm.value;
    this.equipo.enteJuridico = this.CURRENT_USER.entejuridico;
    this.equipo.codigoLiga = this.CURRENT_USER.codigoLiga;
    if(this.esNuevo) {
      this.campProcesosService.crearEquipo(this.equipo).subscribe(
        respuesta => {
          this.equipoForm.controls.estado.setValue('A');
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
    this.cargarValidacionesEquipoJugador();
    this.cargarValoresEquipoJugador();

  }

  cargarValoresEquipoJugador() {
    this.cargarEquipos();
  }

  cargarValidacionesEquipoJugador() {
    this.equipoJugadorForm = this.formBuild.group({
      'codigoEquipoJugador': '',
      'enteJuridico': this.CURRENT_USER.enteJuridico,
      'codigoEquipo': [{value: this.equipoForm.controls.codigoEquipo.value, disabled: true}],
      'equipoNombre': '',
      'ligaEquipo': [{value: this.equipoForm.controls.codigoLiga.value, disabled: true}],
      'nombreLiga': '',
      'codigoJugador': '',
      'nombresJugador': '',
      'numeroJugador': '',
      'esCapitan': '',
      'esJugador': '',
      'esDt': '',
      'estado': '',
      'userCrea': '',
      'userMod': '',
      'codigoPersona': '',
      'nombres': ['', Validators.required],
      'apellidoPaterno': ['', Validators.required],
      'apellidoMaterno': ['', Validators.required],
      'tipoId': '',//['', Validators.required],
      'identificacion': ['', Validators.required],
      'fechaNacimiento': ['', Validators.required],
      'sexo': ['', Validators.required],
      'direccion':'',
      'mail': ['', Validators.required],
      'telefono': ['', Validators.required],
      'celular': ['', Validators.required],
      'codigoPais': '',//['', Validators.required],
      'codigoProvincia': '',//['', Validators.required],
      'codigoCanton': '',//[, Validators.required],
      'codigoParroquia': '',//['', Validators.required],
      'amonestacion': ['', Validators.required],
      'observaciones': ''
    });
  }

  cargarEquipos() {
    this.campProcesosService.obtenerEquipos(this.CURRENT_USER.entejuridico, this.CURRENT_USER.codigoLiga).subscribe(
      equipos => {
        this.listaEquipos = equipos;
      }
    );
  }

  cargarUbicaciones() {
    this.cargarPaises();
    if (this.equipoJugadorForm && this.equipoJugadorForm.controls.codigoPais.value) {
      this.cargarProvincias();
    }
    if (this.equipoJugadorForm && this.equipoJugadorForm.controls.codigoProvincia.value) {
      this.cargarCantones();
    }
    if(this.equipoJugadorForm && this.equipoJugadorForm.controls.codigoCanton.value) {
      this.cargarParroquias();
    }
  }

  cargarPaises() {
    this.campAdminService.obtenerUbicacionesPorCategoria(SisCampProperties.codigoTipoUbicacionPais).subscribe(
      paises => {
        this.listaPaises = paises;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarProvincias() {
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.equipoJugadorForm.value.codigoPais, SisCampProperties.codigoTipoUbicacionProv).subscribe(
      provincias => {
        this.listaPronvincias = provincias;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarCantones() {
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.equipoJugadorForm.value.codigoProvincia, SisCampProperties.codigoTipoUbicacionCanton).subscribe(
      cantones => {
        this.listaCantones = cantones;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarParroquias() {
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.equipoJugadorForm.value.codigoCanton, SisCampProperties.codigoTipoUbicacionParroquia).subscribe(
      parroquias => {
        this.listaParroquias = parroquias;
      },
      err => {
        console.log(err);
      }
    );
  }

  cambiarTab(event){
    let index = event.index;
    if(index === 1){
        this.cargarDatosEquipoJugador();
    }
  }

  calcularEdad(event) {
    let ageDifMs = Date.now() - (event.jsdate ? event.jsdate.getTime() : Date.now());
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
