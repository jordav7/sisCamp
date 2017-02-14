import { Component, OnInit } from '@angular/core';

import { CampAdminService } from '../../../services/camp-admin.service';
import { CampSeguridadService } from '../../../services/camp-seguridad.service';
import { SisCampProperties } from '../../../propiedades';

import { UbicacionGeografica } from '../../../model/admin/ubicacion-geografica';
import { Catalogo } from '../../../model/admin/catalogo';
import { Parametro } from '../../../model/seguridad/parametro';
import { Respuesta } from '../../../model/general/respuesta';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-ubicacion-geografica',
  templateUrl: './ubicacion-geografica.component.html',
  styleUrls: ['./ubicacion-geografica.component.css']
})
export class UbicacionGeograficaComponent implements OnInit {
  listaUbicacionGeografica: UbicacionGeografica[];
  listaEstados: Parametro[];
  mostrarPanelUbi: boolean = false;
  ubicacion: UbicacionGeografica;
  listaCategoria: Catalogo[];
  categoriaSeleccionada: Catalogo;
  esNuevo: boolean = false;
  mensajes: Message[];

  constructor(private campAdminService: CampAdminService, private campSeguridadService: CampSeguridadService) {
    this.ubicacion = new UbicacionGeografica();
    this.categoriaSeleccionada = new Catalogo(-1);
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Ubicaci\u00f3n Geogr\u00e1fica', 'Gesti\u00f3n de Ubicaci\u00f3n Geogr\u00e1fica')));
  }

  ngOnInit() {
    this.cargaCatalogosIniciales();
  }

  cargaCatalogosIniciales(){
    this.campAdminService.obtenerCatalogos(1, 2).subscribe(
        listaCategorias => {
          this.listaCategoria = listaCategorias;
        },
        err => {
          console.log(err);
        }
    );
    this.cargarEstados();
  }

  mostrarDialogCrearUbicacion(){
    this.esNuevo = true;
    this.ubicacion = new UbicacionGeografica();
    this.mostrarPanelUbi = true;
    this.ubicacion.tipo = this.categoriaSeleccionada.codigoCatalogo;

  }

  ocultarSeccionPadre(): boolean{
    return (this.categoriaSeleccionada.codigoCatalogo == 15);
  }

  guardarUbicacion(){
    if(this.esNuevo){
      this.campAdminService.crearUbicacionGeografica(this.ubicacion).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
        },
        err => {
          console.log(err);
        }
      );
    } else{
      this.campAdminService.actualizarUbicacionGeografica(this.ubicacion).subscribe(
        respuesta => {
          this.procesarRespuesta(respuesta);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelUbi = false;
      this.cargaCatalogosIniciales();
      this.ubicacion = new UbicacionGeografica();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
      this.cargarUbicaciones();
    }
  }

  cargarUbicaciones(){
    this.campAdminService.obtenerUbicacionesPorCategoria(this.categoriaSeleccionada.codigoCatalogo).subscribe(
      ubicacionesGeograficas => {
        this.listaUbicacionGeografica = ubicacionesGeograficas;
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarEstados(){
    this.campSeguridadService.obtenerParametrosPorTipo(1, SisCampProperties.codigoCatalogoEstado).subscribe(
      estados => {
        this.listaEstados = estados;
      },
      error => {
        console.log(error);
      }
    );
  }

  seleccionarUbicacion(ubicacion: UbicacionGeografica){
    this.esNuevo = false;
    this.ubicacion = this.clonarUbicacion(ubicacion);
    this.mostrarPanelUbi = true;
  }

  clonarUbicacion(u: UbicacionGeografica): UbicacionGeografica{
    let ubicacion = new UbicacionGeografica();
    for(let prop in u){
      if(prop != "_$visited"){
        ubicacion[prop] = u[prop];
      }
    }
    return ubicacion;
  }
}
