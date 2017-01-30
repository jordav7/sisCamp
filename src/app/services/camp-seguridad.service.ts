import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Respuesta } from '../model/general/respuesta';
import { Parametro } from '../model/seguridad/parametro';
import { Rol } from '../model/seguridad/rol';
import { Ente } from '../model/seguridad/ente';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SisCampProperties } from '../propiedades';

@Injectable()
export class CampSeguridadService {

  private urlServices: string = SisCampProperties.URL_SERVIDOR + '/rs/seguridades';

  constructor(private http: Http) { }

  obtenerParametrosPorTipo(enteJuridico: number, tipoParametro: string): Observable<Parametro[]>{
    return this.http.get(this.urlServices + '/parametrosPorTipo/' + enteJuridico + '/' + tipoParametro)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerRoles(enteJuridico: number): Observable<Rol[]>{
    return this.http.get(this.urlServices + '/roles/' + enteJuridico)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearRol(rol: Rol): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearRol', rol, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarRol(rol: Rol): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarRol', rol, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }
  eliminarRol(rol: Rol): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarRol/' + rol.enteJuridico + '/' + rol.codigoRol)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  obtenerParametros(enteJuridico: number): Observable<Parametro[]>{
    return this.http.get(this.urlServices + '/parametros/' + enteJuridico)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearParametro(parametro: Parametro): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearParametro', parametro, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarParametro(parametro: Parametro): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarParametro', parametro, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }
  eliminarParametro(parametro: Parametro): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarParametro/' +parametro.codigoParametro+ '/' + parametro.enteJuridico + '/' + parametro.codigoTipo)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }


  obtenerEntes(): Observable<Ente[]>{
    return this.http.get(this.urlServices + '/entes')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  crearEnte(ente: Ente): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/crearEnte', ente, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  actualizarEnte(ente: Ente): Observable<Respuesta>{
    let rolString = JSON.stringify;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.urlServices + '/actualizarEnte', ente, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  eliminarEnte(ente: Ente): Observable<Respuesta>{
    return this.http.delete(this.urlServices + '/eliminarParametro/' + ente.enteCodigo)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

}