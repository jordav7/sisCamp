import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { SisCampProperties } from '../propiedades';
import { Equipo } from 'app/model/procesos/equipo';
import { Respuesta } from 'app/model/general/respuesta';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CampProcesosService {

  urlServices: string = SisCampProperties.URL_SERVIDOR + '/rs/procesos'; 
  constructor(private http: Http) { }
  
  obtenerEquipo(enteJuridico: number, codigoEquipo: number): Observable<Equipo[]> {
      return this.http.get(this.urlServices + '/equipo/' + enteJuridico + '/' + codigoEquipo)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    obtenerEquipos(enteJuridico: number, codigoLiga: number): Observable<Equipo[]> {
      return this.http.get(this.urlServices + '/equipos/' + enteJuridico + '/' + codigoLiga)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    crearEquipo(equipo: Equipo): Observable<Respuesta> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.urlServices + '/crearEquipo', equipo, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    actualizarEquipo(equipo: Equipo): Observable<Respuesta> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.put(this.urlServices + '/actualizarEquipo', equipo, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    eliminarEquipo(equipo: Equipo): Observable<Respuesta>{
      return this.http.delete(this.urlServices + '/eliminarEquipo/' + equipo.enteJuridico + '/' + equipo.codigoEquipo)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }
}
