import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { CampAdminService } from '../../../../services/camp-admin.service';
import { CampSeguridadService } from '../../../../services/camp-seguridad.service';

import { Manfun } from '../../../../util/manfun';

import { Usuario } from '../../../../model/seguridad/usuario';
import { Rol } from '../../../../model/seguridad/rol';
import { Parametro } from '../../../../model/seguridad/parametro';
import { Respuesta } from '../../../../model/general/respuesta'
import { Catalogo } from '../../../../model/admin/catalogo';
import { Liga } from '../../../../model/admin/liga';
import { UbicacionGeografica } from '../../../../model/admin/ubicacion-geografica';
import { SisCampProperties } from '../../../../propiedades';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  usuarioForm: any;
  listaEstados: Parametro[] = [];
  listaRoles: Rol[] = [];
  listaLigas: Liga[] = [];
  usuario: Usuario;
  usuarioSeleccionado: Usuario;
  mostrarPanelUsuario: boolean = false;
  esNuevo: boolean = false;
  mostrarPanelConf: boolean = false;
  mensajes: Message[];
  foto: any;
  CURRENT_USER: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private formBuild: FormBuilder,
    private route: ActivatedRoute,
    private campSeguridadService: CampSeguridadService,
    private campAdminService: CampAdminService) {
    this.route.params.subscribe(params => {
        this.usuarioForm = this.cargarValidaciones();
        if(params['enteJuridico'] && params['codigoUsuario']){
          this.esNuevo = false;
          this.campSeguridadService.obtenerUsuario(+params['enteJuridico'], +params['codigoUsuario']).subscribe(
            usuario => {
              this.usuario = usuario;
              this.setValoresEdicion();
            },
            err => {
              console.log(err);
            }
          );
        } else{
          this.esNuevo = true;
          this.usuario = new Usuario();
        }
      }
    );
  }

  ngOnInit() {
    this.cargarCatalogos();
  }

  cargarCatalogos(){
    this.campSeguridadService.obtenerParametrosPorTipo(this.CURRENT_USER.entejuridico, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.listaEstados = estados;
      },
      err => {
        console.log(err);
      }
    );

    this.campSeguridadService.obtenerRoles(this.CURRENT_USER.entejuridico).subscribe(
      roles => {
        this.listaRoles = roles;
      },
      err=> {
        console.log(err);
      }
    );

    this.campAdminService.obtenerLigas(this.CURRENT_USER.entejuridico).subscribe(
      ligas => {
        this.listaLigas = ligas;
      },
      err=> {
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
      'tipoId': '',//['', Validators.required],
      'identificacion': '',// ['', Validators.required],
      'fechaNacimiento': '',//['', Validators.required],
      'sexo': '',//['', Validators.required],
      'direccion':'',
      'mail': ['', Validators.required],
      'telefono': '',//['', Validators.required],
      'celular': '',//['', Validators.required],
      'codigoPais': '',//['', Validators.required],
      'codigoProvincia': '',//['', Validators.required],
      'codigoCanton': '',//[, Validators.required],
      'codigoParroquia': '',//['', Validators.required],
      'codigoUsuario': '',
      'usuario': ['', Validators.required],
      'password': ['', Validators.required],
      'passwordR': ['', Validators.required],
      'estado': ['', Validators.required],
      'codigoRol': ['', Validators.required],
      'codigoLiga': '',
      'observaciones': '',
      'userMod': '',
      'userCrea':''
    });
  }

  guardarUsuario(){
    this.preparaUsuario();
    if(this.esNuevo){
      this.usuario.enteJuridico = this.CURRENT_USER.entejuridico;
      this.campSeguridadService.crearUsuario(this.usuario).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.usuario = new Usuario();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.campSeguridadService.actualizarUsuario(this.usuario).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
          this.usuario = new Usuario();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  preparaUsuario(){
    this.usuario = this.usuarioForm.value;
    this.usuario.foto = this.foto;
    delete this.usuario['passwordR'];
  }

  clonarUsuario(j: Usuario): Usuario{
    let usuario = new Usuario();
    for(let prop in j){
      if(prop != "_$visited"){
        usuario[prop] = j[prop];
      }
    }
    return usuario;
  }

  setValoresEdicion(){
    this.usuarioForm.controls['codigoPersona'].setValue(this.usuario.codigoPersona);
    this.usuarioForm.controls['enteJuridico'].setValue(this.usuario.enteJuridico);
    this.usuarioForm.controls['codigoUsuario'].setValue(this.usuario.codigoUsuario);
    this.usuarioForm.controls['userMod'].setValue(this.usuario.userMod);
    this.usuarioForm.controls['userCrea'].setValue(this.usuario.userCrea);
    this.usuarioForm.controls['nombres'].setValue(this.usuario.nombres);
    this.usuarioForm.controls['apellidoPaterno'].setValue(this.usuario.apellidoPaterno);
    this.usuarioForm.controls['apellidoMaterno'].setValue(this.usuario.apellidoMaterno);
    this.usuarioForm.controls['tipoId'].setValue(this.usuario.tipoId);
    this.usuarioForm.controls['identificacion'].setValue(this.usuario.identificacion);
    //this.usuarioForm.controls['fechaNacimiento'].setValue(Manfun.parseDate(this.usuario.fechaNacimiento.toString()));
    this.usuarioForm.controls['sexo'].setValue(this.usuario.sexo);
    this.usuarioForm.controls['mail'].setValue(this.usuario.mail);
    this.usuarioForm.controls['telefono'].setValue(this.usuario.telefono);
    this.usuarioForm.controls['celular'].setValue(this.usuario.celular);
    this.usuarioForm.controls['codigoPais'].setValue(this.usuario.codigoPais);
    this.usuarioForm.controls['codigoProvincia'].setValue(this.usuario.codigoProvincia);
    this.usuarioForm.controls['codigoCanton'].setValue(this.usuario.codigoCanton);
    this.usuarioForm.controls['codigoParroquia'].setValue(this.usuario.codigoParroquia);
    this.usuarioForm.controls['estado'].setValue(this.usuario.estado);
    this.usuarioForm.controls['observaciones'].setValue(this.usuario.observaciones);
    this.usuarioForm.controls['codigoLiga'].setValue(this.usuario.codigoLiga);
    this.usuarioForm.controls['codigoRol'].setValue(this.usuario.codigoRol);
    this.usuarioForm.controls['usuario'].setValue(this.usuario.usuario);
    this.usuarioForm.controls['password'].setValue(this.usuario.password);
    this.usuarioForm.controls['passwordR'].setValue(this.usuario.password);
    this.foto = this.usuario.foto;
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelUsuario = false;
      this.usuario = new Usuario();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  cargarFotoUsuario(e){
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

  archivoCargado(e){
    var reader = e.target;
    this.foto = btoa(reader.result);
  }

}
