import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from '../../../../services/camp-admin.service';
import { CampSeguridadService } from '../../../../services/camp-seguridad.service';

import { Manfun } from '../../../../util/manfun';

import { Jugador } from '../../../../model/admin/jugador';
import { Parametro } from '../../../../model/seguridad/parametro';
import { Respuesta } from '../../../../model/general/respuesta'
import { Catalogo } from '../../../../model/admin/catalogo';
import { UbicacionGeografica } from '../../../../model/admin/ubicacion-geografica';
import { SisCampProperties } from '../../../../propiedades';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-jugador-edit',
  templateUrl: './jugador-edit.component.html',
  styleUrls: ['./jugador-edit.component.css']
})
export class JugadorEditComponent implements OnInit {
  jugadorForm: any;
  listaTipoIdentificaciones: Parametro[] = [];
  listaEstados: Parametro[] = [];
  listaPaises: UbicacionGeografica[] = [];
  listaPronvincias: UbicacionGeografica[] = [];
  listaCantones: UbicacionGeografica[] = [];
  listaParroquias: UbicacionGeografica[] = [];
  jugador: Jugador;
  jugadorSeleccionado: Jugador;
  mostrarPanelJugador: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];
  foto: any;
  es: any;
  fechaDefault: Date = new Date(Date.now());
  @Input() modal: boolean;
  @Output() afterSave: EventEmitter<any> = new EventEmitter();

  constructor(private campAdminService: CampAdminService, private formBuild: FormBuilder, private route: ActivatedRoute, private campSeguridadService: CampSeguridadService) {
    this.route.params.subscribe(params => {
        this.jugadorForm = this.cargarValidaciones();
        if(params['enteJuridico'] && params['codigoJugador']){
          this.esNuevo = false;
          this.campAdminService.obtenerJugador(+params['enteJuridico'], +params['codigoJugador']).subscribe(
            jugador => {
              this.jugador = jugador;
              this.setValoresEdicion();
              this.cargarUbicaciones();
            },
            err => {
              console.log(err);
            }
          );
        } else{
          this.esNuevo = true;
          this.jugador = new Jugador();
        }
      }
    );
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Jugador', 'Gesti\u00f3n de Jugadores')));
  }

  ngOnInit() {
    this.cargarCatalogos();
    this.cargarLenguajeCalendario();
  }

  cargarCatalogos(){
    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoTipoId).subscribe(
      tipoIdentificaciones => {
        this.listaTipoIdentificaciones = tipoIdentificaciones;
      },
      err => {
        console.log(err);
      }
    );

    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.listaEstados = estados;
      },
      err => {
        console.log(err);
      }
    );

    this.cargarUbicaciones();
  }

  cargarLenguajeCalendario(){
   this.es = {
           firstDayOfWeek: 1,
           dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
           dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
           dayNamesMin: [ "D","L","M","X","J","V","S" ],
           monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
           monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
       }
  }

  cargarValidaciones(){
    return this.formBuild.group({
      'codigoPersona': '',
      'enteJuridico': '',
      'nombres': ['', Validators.required],
      'apellidoPaterno': ['', Validators.required],
      'apellidoMaterno': ['', Validators.required],
      'tipoId': ['', Validators.required],
      'identificacion': ['', Validators.required],
      'fechaNacimiento': ['', Validators.required],
      'sexo': ['', Validators.required],
      'direccion':'',
      'mail': ['', Validators.required],
      'telefono': ['', Validators.required],
      'celular': ['', Validators.required],
      'codigoPais': ['', Validators.required],
      'codigoProvincia': ['', Validators.required],
      'codigoCanton': [, Validators.required],
      'codigoParroquia': ['', Validators.required],
      'codigoJugador': '',
      'amonestacion': ['', Validators.required],
      'estado': ['', Validators.required],
      'observaciones': '',
      'userMod': '',
      'userCrea':''
    });
  }

  cargarUbicaciones() {
    this.cargarPaises();
    this.cargarProvincias();
    this.cargarCantones();
    this.cargarParroquias();
  }

  guardarJugador() {
    this.jugador = this.jugadorForm.value;
    this.jugador.foto = this.foto;
    if(this.esNuevo){
      this.jugador.enteJuridico = 1;
      this.campAdminService.crearJugador(this.jugador).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.jugador = new Jugador();
        },
        err => {
          this.procesarRespuestaError(err);
        },
        () => {
          this.afterSave.emit({mensajes: this.mensajes, respuesta: this.manejaRespuestaEvento(this.mensajes)});
        }
      );
    }else{
      this.campAdminService.actualizarJugador(this.jugador).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.jugador = new Jugador();
        },
        err => {
          this.procesarRespuestaError(err);
        },
        () => {
          this.afterSave.emit({mensajes: this.mensajes, respuesta: this.manejaRespuestaEvento(this.mensajes)});
        }
      );
    }
  }

  clonarJugador(j: Jugador): Jugador {
    let jugador = new Jugador();
    for(let prop in j){
      if(prop != "_$visited"){
        jugador[prop] = j[prop];
      }
    }
    return jugador;
  }

  setValoresEdicion() {
    this.jugadorForm.controls['codigoPersona'].setValue(this.jugador.codigoPersona);
    this.jugadorForm.controls['enteJuridico'].setValue(this.jugador.enteJuridico);
    this.jugadorForm.controls['codigoJugador'].setValue(this.jugador.codigoJugador);
    this.jugadorForm.controls['userMod'].setValue(this.jugador.userMod);
    this.jugadorForm.controls['userCrea'].setValue(this.jugador.userCrea);
    this.jugadorForm.controls['nombres'].setValue(this.jugador.nombres);
    this.jugadorForm.controls['apellidoPaterno'].setValue(this.jugador.apellidoPaterno);
    this.jugadorForm.controls['apellidoMaterno'].setValue(this.jugador.apellidoMaterno);
    this.jugadorForm.controls['tipoId'].setValue(this.jugador.tipoId);
    this.jugadorForm.controls['identificacion'].setValue(this.jugador.identificacion);
    this.jugadorForm.controls['fechaNacimiento'].setValue(Manfun.parseDate(this.jugador.fechaNacimiento.toString()));
    this.jugadorForm.controls['sexo'].setValue(this.jugador.sexo);
    this.jugadorForm.controls['mail'].setValue(this.jugador.mail);
    this.jugadorForm.controls['telefono'].setValue(this.jugador.telefono);
    this.jugadorForm.controls['celular'].setValue(this.jugador.celular);
    this.jugadorForm.controls['codigoPais'].setValue(this.jugador.codigoPais);
    this.jugadorForm.controls['codigoProvincia'].setValue(this.jugador.codigoProvincia);
    this.jugadorForm.controls['codigoCanton'].setValue(this.jugador.codigoCanton);
    this.jugadorForm.controls['codigoParroquia'].setValue(this.jugador.codigoParroquia);
    this.jugadorForm.controls['amonestacion'].setValue(this.jugador.amonestacion);
    this.jugadorForm.controls['estado'].setValue(this.jugador.estado);
    this.jugadorForm.controls['observaciones'].setValue(this.jugador.observaciones);
    this.foto = this.jugador.foto;
  }

  procesarRespuesta(respuesta: Respuesta) {
    if(respuesta.codigo === SisCampProperties.CODIGO_OK){
      this.mostrarPanelJugador = false;
      this.jugador = new Jugador();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
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
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.jugadorForm.value.codigoPais, SisCampProperties.codigoTipoUbicacionProv).subscribe(
      provincias => {
        this.listaPronvincias = provincias;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarCantones() {
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.jugadorForm.value.codigoProvincia, SisCampProperties.codigoTipoUbicacionCanton).subscribe(
      cantones => {
        this.listaCantones = cantones;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarParroquias() {
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.jugadorForm.value.codigoCanton, SisCampProperties.codigoTipoUbicacionParroquia).subscribe(
      parroquias => {
        this.listaParroquias = parroquias;
      },
      err => {
        console.log(err);
      }
    );
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

  procesarRespuestaError(error: string) {
    this.mensajes = [];
    this.mensajes.push({severity: 'error', summary: 'Respuesta', detail: error});
  }

  manejaRespuestaEvento(mensajes: Message[]): Respuesta {
    let respuesta = new Respuesta(SisCampProperties.CODIGO_OK);
    for(let mensaje of mensajes) {
      if(mensaje.severity === 'error'){
        respuesta = new Respuesta(SisCampProperties.CODIGO_ERROR, mensaje.detail);
        break;
      }
    }
    return respuesta;
  }

  calcularEdad(event) {
    console.log('El valor es ' + event.target.value + 'mas '+ this.jugadorForm.controls.fechaNacimiento.value);
    let ageDifMs = Date.now() - this.jugadorForm.controls.fechaNacimiento ? this.jugadorForm.controls.fechaNacimiento.value.getTime() : 0;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
