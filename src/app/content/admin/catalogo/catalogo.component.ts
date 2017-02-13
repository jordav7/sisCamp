import { Component, OnInit } from '@angular/core';
import { CampAdminService } from '../../../services/camp-admin.service';
import { TipoCatalogo } from '../../../model/admin/tipo-catalogo';
import { Catalogo } from '../../../model/admin/catalogo';
import { Respuesta } from '../../../model/general/respuesta';
import { CabeceraPagina } from 'app/model/general/cabecera-pagina';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'ld-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  mensajes: Message[];
  tipoCatalogo: TipoCatalogo;
  listaTiposCatalogos: TipoCatalogo[] = [];
  listaCatalogos: Catalogo[] = [];
  catalogo: Catalogo;
  catalogoSeleccionado: Catalogo;
  respuesta: Respuesta;
  esNuevo: boolean;
  mostrarPanelCat: boolean = false;
  mostrarPanelConf:boolean = false;

  constructor(private campAdminService: CampAdminService) {
    this.tipoCatalogo = new TipoCatalogo();
    this.catalogo = new Catalogo();
    this.respuesta = new Respuesta();
    sessionStorage.setItem('currentPage', JSON.stringify(new CabeceraPagina('Catalogos', 'Gestion de catalogos')));
  }

  ngOnInit() {
    this.cargarTiposCatalogos();
  }

  cargarTiposCatalogos(){
    this.campAdminService.obtenerTipoCatalogos(1).subscribe(
      tiposCatalogos => this.listaTiposCatalogos = tiposCatalogos,
      err => {
        console.log(err);
    });
  }

  cargarCatalogos(){
    this.campAdminService.obtenerCatalogos(1, this.tipoCatalogo.codigoTipo).subscribe(
      catalogos => this.listaCatalogos = catalogos,
      err => {
        console.log(err);
      }
    );
  }

  guardarCatalogo(){
    this.catalogo.enteJuridico = 1;
    this.catalogo.tipoCatalogo = this.tipoCatalogo.codigoTipo;
    if(this.esNuevo){
      this.campAdminService.crearCatalogo(this.catalogo).subscribe(
        respuesta => {
          this.respuesta = respuesta;
          this.procesarRespuesta(respuesta);
          this.catalogo = new Catalogo();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.campAdminService.actualizarCatalogo(this.catalogo).subscribe(
        respuesta => {
          this.respuesta = respuesta;
          this.procesarRespuesta(respuesta);
          this.catalogo = new Catalogo();
        },
        err => {
          console.log(err);
        }
      );
    }

  }

  eliminarCatalogo(){
    this.campAdminService.eliminarCatalogo(this.catalogoSeleccionado).subscribe(
      respuesta => {
        this.respuesta = respuesta;
        this.procesarRespuestaBorrado(respuesta);
      },
      err => {
        console.log(err);
      }
    );
  }

  seleccionarCatalogo(catalogo: Catalogo) {
      this.esNuevo = false;
      this.catalogo = this.clonarCatalogo(catalogo);
      this.mostrarPanelCat = true;
  }

  clonarCatalogo(c: Catalogo): Catalogo{
    let catalogo = new Catalogo();
    for(let prop in c){
      if(prop != "_$visited"){
        catalogo[prop] = c[prop];
      }
    }
    return catalogo;
  }

  procesarRespuesta(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelCat = false;
      this.cargarCatalogos();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'Registro guardado correctamente'});
    }
  }

  procesarRespuestaBorrado(respuesta: Respuesta){
    if(respuesta.codigo == "0"){
      this.mostrarPanelConf = false;
      this.cargarCatalogos();
      this.mensajes = [];
      this.mensajes.push({severity:'success', summary:'Respuesta', detail:'El registro fue eliminado exitosamente'});
    }
  }

  mostrarDialogCrearCatalogo(){
    this.mostrarPanelCat = true;
    this.esNuevo = true;
  }

  mostrarConfirmacion(catalogo: Catalogo){
    this.mostrarPanelConf = true;
    this.catalogoSeleccionado = catalogo;
  }

  habilitarBotonAgregar(): boolean{
    return !(this.tipoCatalogo.codigoTipo != null && this.tipoCatalogo.codigoTipo != -1);
  }

}
