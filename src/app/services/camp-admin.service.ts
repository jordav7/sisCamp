import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TipoCatalogo } from '../model/admin/tipo-catalogo';
import { Catalogo } from '../model/admin/catalogo';
import { Respuesta } from '../model/general/respuesta';
import { UbicacionGeografica } from '../model/admin/ubicacion-geografica';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SisCampProperties } from '../propiedades';

@Injectable()
export class CampAdminService {

  constructor(private http: Http) { }

  private urlServices: string = SisCampProperties.URL_SERVIDOR + "/rs/admin";

  obtenerTipoCatalogos(codigoEnte: number): Observable<TipoCatalogo[]>{
    return this.http.get(this.urlServices + '/tipoCatalogos/' + codigoEnte).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error     ));
  }

  obtenerCatalogos(codigoEnte: number, codigoTipo: number): Observable<Catalogo[]>{
    return this.http.get(this.urlServices + '/catalogos/'+ codigoEnte + '/' + codigoTipo).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error     ));
  }

  crearCatalogo(catalogo: Object): Observable<Respuesta>{
    let catalogoString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearCatalogo', catalogo, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarCatalogo(catalogo: Object): Observable<Respuesta>{
    let catalogoString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarCatalogo', catalogo, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  eliminarCatalogo(catalogo: Catalogo): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarCatalogo/' + catalogo.enteJuridico + '/' + catalogo.tipoCatalogo + '/' + catalogo.codigoCatalogo)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerUbicacionesPorCategoria(categoria: number): Observable<UbicacionGeografica[]>{
    return this.http.get(this.urlServices + '/listarUbicGeografPorCategoria/' + categoria)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'Error en el servidor');
  }

  obtenerUbicacionesGeograficasPorCodPadre(codigoPadre: number, categoria: number): Observable<UbicacionGeografica[]>{
    return this.http.get(this.urlServices + '/listarUbicGeografPorCodPadre/' + codigoPadre + '/' + categoria)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearUbicacionGeografica(ubicacion: UbicacionGeografica): Observable<Respuesta>{
    let ubicacionString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearUbicacionGeografica', ubicacion, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarUbicacionGeografica(ubicacion: UbicacionGeografica): Observable<Respuesta>{
    let ubicacionString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarUbicacionGeografica', ubicacion, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

}
