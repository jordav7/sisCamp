import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TipoCatalogo } from '../model/admin/tipo-catalogo';
import { Catalogo } from '../model/admin/catalogo';
import { Jugador } from '../model/admin/jugador';
import { Arbitro } from '../model/admin/arbitro';
import { Liga } from '../model/admin/liga';
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

  obtenerJugador(enteJuridico: number, codigoJugador: number): Observable<Jugador>{
    return this.http.get(this.urlServices + '/jugador/' + enteJuridico + '/' + codigoJugador)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerJugadores(enteJuridico: number): Observable<Jugador[]>{
    return this.http.get(this.urlServices + '/jugadores/' + enteJuridico)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearJugador(jugador: Jugador): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearJugador', jugador, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarJugador(jugador: Jugador): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarJugador', jugador, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  eliminarJugador(jugador: Jugador): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarJugador/' + jugador.enteJuridico + '/' + jugador.codigoJugador)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerArbitro(enteJuridico: number, codigoArbitro: number): Observable<Arbitro>{
    return this.http.get(this.urlServices + '/arbitro/' + enteJuridico + '/' +codigoArbitro)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerArbitros(enteJuridico: number): Observable<Arbitro[]>{
    return this.http.get(this.urlServices + '/arbitros/' + enteJuridico)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearArbitro(arbitro: Arbitro): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearArbitro', arbitro, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarArbitro(arbitro: Arbitro): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarArbitro', arbitro, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  eliminarArbitro(arbitro: Arbitro): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarArbitro/' + arbitro.enteJuridico + '/' + arbitro.codigoArbitro)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerLiga(enteJuridico: number, codigoLiga: number): Observable<Liga[]> {
    return this.http.get(this.urlServices + '/liga/' + enteJuridico + '/' + codigoLiga)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerLigas(enteJuridico: number): Observable<Liga[]> {
    return this.http.get(this.urlServices + '/ligas/' + enteJuridico)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearLiga(liga: Liga): Observable<Respuesta> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearLiga', liga, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarLiga(liga: Liga): Observable<Respuesta> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarLiga', liga, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  eliminarLiga(liga: Liga): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarLiga/' + liga.enteJuridico + '/' + liga.codigoLiga)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

}
