import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from '../../../../services/camp-admin.service';
import { CampSeguridadService } from '../../../../services/camp-seguridad.service';

import { Manfun } from '../../../../util/manfun';

import { Arbitro } from '../../../../model/admin/arbitro';
import { Parametro } from '../../../../model/seguridad/parametro';
import { Respuesta } from '../../../../model/general/respuesta'
import { Catalogo } from '../../../../model/admin/catalogo';
import { UbicacionGeografica } from '../../../../model/admin/ubicacion-geografica';
import { SisCampProperties } from '../../../../propiedades';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-arbitro-edit',
  templateUrl: './arbitro-edit.component.html',
  styleUrls: ['./arbitro-edit.component.css']
})
export class ArbitroEditComponent implements OnInit {

  arbitroForm: any;
  listaTipoIdentificaciones: Parametro[] = [];
  listaEstados: Parametro[] = [];
  listaPaises: UbicacionGeografica[] = [];
  listaPronvincias: UbicacionGeografica[] = [];
  listaCantones: UbicacionGeografica[] = [];
  listaParroquias: UbicacionGeografica[] = [];
  arbitro: Arbitro;
  arbitroSeleccionado: Arbitro;
  mostrarPanelArbitro: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];
  foto: any;

  constructor(private campAdminService: CampAdminService, private formBuild: FormBuilder, private route: ActivatedRoute, private campSeguridadService: CampSeguridadService) {
    this.route.params.subscribe(params => {
        this.arbitroForm = this.cargarValidaciones();
        if(params['enteJuridico'] && params['codigoArbitro']){
          this.esNuevo = false;
          this.campAdminService.obtenerArbitro(+params['enteJuridico'], +params['codigoArbitro']).subscribe(
            arbitro => {
              this.arbitro = arbitro;
              this.setValoresEdicion();
            },
            err => {
              console.log(err);
            }
          );
        } else{
          this.esNuevo = true;
          this.arbitro = new Arbitro();
        }
      }
    );
  }

  ngOnInit() {
    this.cargarCatalogos();
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
      'fechaNacimiento': '',//['', Validators.required],
      'sexo': '',//['', Validators.required],
      'direccion':['', Validators.required],
      'mail': ['', Validators.required],
      'telefono': ['', Validators.required],
      'celular': ['', Validators.required],
      'codigoPais': '',//['', Validators.required],
      'codigoProvincia': '',//['', Validators.required],
      'codigoCanton': '',//[, Validators.required],
      'codigoParroquia': '',//['', Validators.required],
      'codigoArbitro': '',
      'estado': ['', Validators.required],
      'observaciones': '',
      'userMod': '',
      'userCrea':''
    });
  }

  guardarArbitro(){
    this.arbitro = this.arbitroForm.value;
    if(this.esNuevo){
      this.arbitro.enteJuridico = 1;
      this.campAdminService.crearArbitro(this.arbitro).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.arbitro = new Arbitro();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.campAdminService.actualizarArbitro(this.arbitro).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.arbitro = new Arbitro();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  clonarArbitro(j: Arbitro): Arbitro{
    let arbitro = new Arbitro();
    for(let prop in j){
      if(prop != "_$visited"){
        arbitro[prop] = j[prop];
      }
    }
    return arbitro;
  }

  setValoresEdicion(){
    this.arbitroForm.controls['codigoPersona'].setValue(this.arbitro.codigoPersona);
    this.arbitroForm.controls['enteJuridico'].setValue(this.arbitro.enteJuridico);
    this.arbitroForm.controls['codigoArbitro'].setValue(this.arbitro.codigoArbitro);
    this.arbitroForm.controls['userMod'].setValue(this.arbitro.userMod);
    this.arbitroForm.controls['userCrea'].setValue(this.arbitro.userCrea);
    this.arbitroForm.controls['nombres'].setValue(this.arbitro.nombres);
    this.arbitroForm.controls['apellidoPaterno'].setValue(this.arbitro.apellidoPaterno);
    this.arbitroForm.controls['apellidoMaterno'].setValue(this.arbitro.apellidoMaterno);
    this.arbitroForm.controls['tipoId'].setValue(this.arbitro.tipoId);
    this.arbitroForm.controls['identificacion'].setValue(this.arbitro.identificacion);
    this.arbitroForm.controls['direccion'].setValue(this.arbitro.direccion);
    //this.arbitroForm.controls['fechaNacimiento'].setValue(Manfun.parseDate(this.arbitro.fechaNacimiento.toString()));
    this.arbitroForm.controls['sexo'].setValue(this.arbitro.sexo);
    this.arbitroForm.controls['mail'].setValue(this.arbitro.mail);
    this.arbitroForm.controls['telefono'].setValue(this.arbitro.telefono);
    this.arbitroForm.controls['celular'].setValue(this.arbitro.celular);
    this.arbitroForm.controls['codigoPais'].setValue(this.arbitro.codigoPais);
    this.arbitroForm.controls['codigoProvincia'].setValue(this.arbitro.codigoProvincia);
    this.arbitroForm.controls['codigoCanton'].setValue(this.arbitro.codigoCanton);
    this.arbitroForm.controls['codigoParroquia'].setValue(this.arbitro.codigoParroquia);
    this.arbitroForm.controls['estado'].setValue(this.arbitro.estado);
    this.arbitroForm.controls['observaciones'].setValue(this.arbitro.observaciones);
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelArbitro = false;
      this.arbitro = new Arbitro();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  cargarProvincias(){
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.arbitroForm.value.codigoPais, SisCampProperties.codigoTipoUbicacionProv).subscribe(
      provincias => {
        this.listaPronvincias = provincias;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarCantones(){
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.arbitroForm.value.codigoProvincia, SisCampProperties.codigoTipoUbicacionCanton).subscribe(
      cantones => {
        this.listaCantones = cantones;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarParroquias(){
    this.campAdminService.obtenerUbicacionesGeograficasPorCodPadre(this.arbitroForm.value.codigoCanton, SisCampProperties.codigoTipoUbicacionParroquia).subscribe(
      parroquias => {
        this.listaParroquias = parroquias;
      },
      err => {
        console.log(err);
      }
    );
  }

}
