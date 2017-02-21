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
import { Manfun } from 'app/util/manfun';

import { Message } from 'primeng/primeng';

import {IMyOptions} from 'mydatepicker';

import { EquipoJugador } from 'app/model/procesos/equipo-jugador';
import { Jugador } from 'app/model/admin/jugador';
import { PeticionEquipoJugador }  from 'app/model/procesos/peticion-equipo-jugador';

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
  listaJugadoresEquipo: EquipoJugador[] = [];
  esNuevo: boolean;
  equipoForm: any;
  equipo: Equipo;
  habilitarTabJugador: boolean;

  //Variables EquipoJugador
  equipoJugadorForm: any;
  equipoJugador: EquipoJugador;
  jugador: Jugador;
  peticionEquipoJugador: PeticionEquipoJugador;
  listaEquipos: Equipo[];
  verJugador: boolean;
  verInteligas: boolean;
  edad: number;
  listaTipoIdentificaciones: Parametro[] = [];
  listaPaises: UbicacionGeografica[] = [];
  listaPronvincias: UbicacionGeografica[] = [];
  listaCantones: UbicacionGeografica[] = [];
  listaParroquias: UbicacionGeografica[] = [];
  foto: any;
  esNuevoJugador: boolean;
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
    //this.cargarDatosEquipoJugador();
    console.log('Termina de cargar equipos jugador');
  }

  cargarDatosIniciales() {
    this.cargarTiposId();
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
              this.cargarJugadoresEquipo();
              this.cargarDatosEquipoJugador();
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

  cargarTiposId() {
    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoTipoId).subscribe(
      tipoIdentificaciones => {
        this.listaTipoIdentificaciones = tipoIdentificaciones;
      },
      err => {
        console.log(err);
      }
    );
  }

  setValoresEdicion() {
    this.equipoForm.setValue(this.equipo);
    //this.equipoJugadorForm.controls.codigoEquipo.setValue(this.equipo.codigoEquipo);
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
      this.cerrarTabPostGuardar();
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
    //this.btnCerrarEquipoJug.nativeElement.click();
    console.log('Ingreso a guardar equipo jugador');
    this.prepararObjetosGuardar();
    if (this.esNuevoJugador) {
      console.log('Ingreso a nuevo');
      this.campProcesosService.crearJugadorEquipo(this.peticionEquipoJugador).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
        },
        err => {
          this.procesarRespuestaError(err);
        }
      );
    } else {
      this.campProcesosService.actualizarJugadorEquipo(this.peticionEquipoJugador).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
        },
        err => {
          this.procesarRespuestaError(err);
        }
      );
    }
  }

  prepararObjetosGuardar() {
    this.prepararJugador();
    this.prepararEquipo();
    this.prepararPeticion();
  }

  prepararJugador() {
    this.jugador.codigoPersona = this.equipoJugadorForm.controls['codigoPersona'].value;
    this.jugador.enteJuridico = this.CURRENT_USER.entejuridico;
    this.jugador.codigoJugador = this.equipoJugadorForm.controls['codigoJugador'].value;
    this.jugador.userMod = this.equipoJugadorForm.controls['userMod'].value;
    this.jugador.userCrea = this.equipoJugadorForm.controls['userCrea'].value;
    this.jugador.nombres = this.equipoJugadorForm.controls['nombres'].value;
    this.jugador.apellidoPaterno = this.equipoJugadorForm.controls['apellidoPaterno'].value;
    this.jugador.apellidoMaterno = this.equipoJugadorForm.controls['apellidoMaterno'].value;
    this.jugador.tipoId = this.equipoJugadorForm.controls['tipoId'].value;
    this.jugador.identificacion = this.equipoJugadorForm.controls['identificacion'].value;
    this.jugador.fechaNacimiento = this.convertirMydateADate(this.equipoJugadorForm.controls['fechaNacimiento'].value);
    this.jugador.direccion = this.equipoJugadorForm.controls.direccion.value;
    this.jugador.sexo = this.equipoJugadorForm.controls['sexo'].value;
    this.jugador.mail = this.equipoJugadorForm.controls['mail'].value;
    this.jugador.telefono = this.equipoJugadorForm.controls['telefono'].value;
    this.jugador.celular = this.equipoJugadorForm.controls['celular'].value;
    this.jugador.codigoPais = this.equipoJugadorForm.controls['codigoPais'].value;
    this.jugador.codigoProvincia = this.equipoJugadorForm.controls['codigoProvincia'].value;
    this.jugador.codigoCanton = this.equipoJugadorForm.controls['codigoCanton'].value;
    this.jugador.codigoParroquia = this.equipoJugadorForm.controls['codigoParroquia'].value;
    this.jugador.amonestacion = this.equipoJugadorForm.controls['amonestacion'].value;
    this.jugador.estado = this.equipoJugadorForm.controls['estado'].value;
    this.jugador.observaciones = this.equipoJugadorForm.controls['observaciones'].value;
    this.jugador.foto = this.foto;
  }

  prepararEquipo() {
    this.equipoJugador.enteJuridico = this.CURRENT_USER.entejuridico;
    this.equipoJugador.codigoEquipo = this.equipoJugadorForm.controls.codigoEquipo.value;
    this.equipoJugador.ligaEquipo = this.equipoJugadorForm.controls.ligaEquipo.value;
    this.equipoJugador.numeroJugador =  this.equipoJugadorForm.controls.numeroJugador.value;
    this.equipoJugador.esCapitan = this.equipoJugadorForm.controls.esCapitan.value ? 'S' : 'N';
    this.equipoJugador.esJugador = this.equipoJugadorForm.controls.esJugador.value ? 'S' : 'N';
    this.equipoJugador.esDt = this.equipoJugadorForm.controls.esDt.value ? 'S' : 'N';
  }

  prepararPeticion() {
    this.peticionEquipoJugador = new PeticionEquipoJugador();
    this.peticionEquipoJugador.jugador = this.jugador;
    this.peticionEquipoJugador.equipoJugador = this.equipoJugador;
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
      'apellidoMaterno': '',//['', Validators.required],
      'tipoId': ['', Validators.required],
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

  cargarJugadoresEquipo() {
    this.campProcesosService.obtenerJugadoresEquipo(this.CURRENT_USER.entejuridico, this.equipo.codigoEquipo).subscribe(
      jugadoresEquipo => {
        this.listaJugadoresEquipo = jugadoresEquipo;
      },
      err => {
        console.log(err);
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
    if (index === 0) {
        this.habilitarTabJugador = false;
    }
  }

  calcularEdad(event) {
    let ageDifMs = Date.now() - (event.jsdate ? event.jsdate.getTime() : Date.now());
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  agregarJugador() {
    this.habilitarTabJugador = true;
    this.esNuevoJugador = true;
    this.jugador = new Jugador();
    this.equipoJugador = new EquipoJugador();
    //this.cargarDatosEquipoJugador();
  }

  editarJugadorEquipo (jugadorEquipo: EquipoJugador) {
    this.equipoJugador = jugadorEquipo;
    this.obtenerJugador(jugadorEquipo);
    //this.cargarDatosEquipoJugador();

    this.cargarEquipoJugadorEdicion();
    this.habilitarTabJugador = true;
    this.esNuevoJugador = false;
  }

  cargarFotoJugador(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }

    reader.onload = this.archivoCargado.bind(this);
    reader.readAsBinaryString(file);
  }

  archivoCargado(e) {
    var reader = e.target;
    this.foto = btoa(reader.result);
  }

  cerrarTabPostGuardar() {
    this.habilitarTabJugador = false;
    this.esNuevoJugador = false;
  }

  convertirMydateADate(valor: any): Date {
    let fechaNacimiento = null;
    if (valor) {
      fechaNacimiento = valor.jsdate;
    }
    return fechaNacimiento;
  }

  cargarEquipoJugadorEdicion () {
    this.equipoJugadorForm.controls.codigoEquipoJugador.setValue(this.equipoJugador.codigoEquipoJugador);
    this.equipoJugadorForm.controls.codigoEquipo.setValue(this.equipoJugador.codigoEquipo);
    this.equipoJugadorForm.controls.ligaEquipo.setValue(this.equipoJugador.ligaEquipo);
    this.equipoJugadorForm.controls.numeroJugador.setValue(this.equipoJugador.numeroJugador);
    this.equipoJugadorForm.controls.esCapitan.setValue(this.equipoJugador.esCapitan === 'S');
    this.equipoJugadorForm.controls.esJugador.setValue(this.equipoJugador.esJugador === 'S');
    this.equipoJugadorForm.controls.esDt.setValue(this.equipoJugador.esDt === 'S');
  }

  cargarJugadorEdicion () {
    let fechaNac =this.jugador.fechaNacimiento ? Manfun.parseDate(this.jugador.fechaNacimiento.toString()) : null;
    this.equipoJugadorForm.controls.codigoPersona.setValue(this.jugador.codigoPersona);
    this.equipoJugadorForm.controls['enteJuridico'].setValue(this.jugador.enteJuridico);
    this.equipoJugadorForm.controls['codigoJugador'].setValue(this.jugador.codigoJugador);
    this.equipoJugadorForm.controls['userMod'].setValue(this.jugador.userMod);
    this.equipoJugadorForm.controls['userCrea'].setValue(this.jugador.userCrea);
    this.equipoJugadorForm.controls['nombres'].setValue(this.jugador.nombres);
    this.equipoJugadorForm.controls['apellidoPaterno'].setValue(this.jugador.apellidoPaterno);
    this.equipoJugadorForm.controls['apellidoMaterno'].setValue(this.jugador.apellidoMaterno);
    this.equipoJugadorForm.controls['tipoId'].setValue(this.jugador.tipoId);
    this.equipoJugadorForm.controls['identificacion'].setValue(this.jugador.identificacion);
    this.equipoJugadorForm.controls.fechaNacimiento.setValue({date:{year: fechaNac.getFullYear(), month: fechaNac.getMonth() + 1, day: fechaNac.getDate() + 1}});
    this.equipoJugadorForm.controls.direccion.setValue(this.jugador.direccion);
    this.equipoJugadorForm.controls['sexo'].setValue(this.jugador.sexo);
    this.equipoJugadorForm.controls['mail'].setValue(this.jugador.mail);
    this.equipoJugadorForm.controls['telefono'].setValue(this.jugador.telefono);
    this.equipoJugadorForm.controls['celular'].setValue(this.jugador.celular);
    this.equipoJugadorForm.controls['codigoPais'].setValue(this.jugador.codigoPais);
    this.equipoJugadorForm.controls['codigoProvincia'].setValue(this.jugador.codigoProvincia);
    this.equipoJugadorForm.controls['codigoCanton'].setValue(this.jugador.codigoCanton);
    this.equipoJugadorForm.controls['codigoParroquia'].setValue(this.jugador.codigoParroquia);
    this.equipoJugadorForm.controls['amonestacion'].setValue(this.jugador.amonestacion);
    this.equipoJugadorForm.controls['estado'].setValue(this.jugador.estado);
    this.equipoJugadorForm.controls['observaciones'].setValue(this.jugador.observaciones);
    this.foto = this.jugador.foto;
  }

  obtenerJugador(jugadorEquipo: EquipoJugador) {
    this.campAdminService.obtenerJugador(jugadorEquipo.enteJuridico, jugadorEquipo.codigoJugador).subscribe(
      jugador => {
        this.jugador = jugador;
        this.cargarJugadorEdicion();
        this.cargarUbicaciones();
      },
      err => {
        this.procesarRespuestaError(err);
      }
    );
  }

}
