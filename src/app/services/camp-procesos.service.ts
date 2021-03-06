import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { SisCampProperties } from '../propiedades';
import { Equipo } from 'app/model/procesos/equipo';
import { EquipoJugador } from 'app/model/procesos/equipo-jugador';
import { EquipoJugadorDisciplina } from 'app/model/procesos/equipo-jugador-disciplina';
import { PeticionEquipoJugador } from 'app/model/procesos/peticion-equipo-jugador';
import { Respuesta } from 'app/model/general/respuesta';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CampProcesosService {

  urlServices: string = SisCampProperties.URL_SERVIDOR + '/rs/procesos';
  constructor(private http: Http) { }

  obtenerEquipo(enteJuridico: number, codigoEquipo: number): Observable<Equipo> {
      return this.http.get(this.urlServices + '/equipo/' + enteJuridico + '/' + codigoEquipo)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    obtenerEquipos(enteJuridico: number, codigoLiga: number): Observable<Equipo[]> {
      let parameters = new URLSearchParams();
      let codigoLigaS = codigoLiga?codigoLiga.toString():null;
      parameters.set('codigoLiga', codigoLigaS);
      return this.http.get(this.urlServices + '/equipos/' + enteJuridico, {search: parameters})
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    obtenerEquiposActivos(enteJuridico: number, codigoLiga: number): Observable<Equipo[]> {
      let parameters = new URLSearchParams();
      let codigoLigaS = codigoLiga?codigoLiga.toString():null;
      parameters.set('codigoLiga', codigoLigaS);
      return this.http.get(this.urlServices + '/equiposActivos/' + enteJuridico, {search: parameters})
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

    obtenerJugadoresEquipo(enteJuridico: number, codigoEquipo: number): Observable<EquipoJugador[]> {
      return this.http.get(this.urlServices + '/equiposJugador/' + enteJuridico + '/' + codigoEquipo)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));;
    }

    crearJugadorEquipo(peticion: PeticionEquipoJugador): Observable<Respuesta>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.urlServices + '/crearJugadorEquipo', peticion, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));;
    }

    actualizarJugadorEquipo(peticion: PeticionEquipoJugador): Observable<Respuesta>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.put(this.urlServices + '/actualizarJugadorEquipo', peticion, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    clonarJugadorEquipo (equipo: Equipo): Observable<Respuesta> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.urlServices + '/clonarJugadorEquipo', equipo, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    crearActualizarJugadorEquipo(peticion: PeticionEquipoJugador): Observable<Respuesta> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.urlServices + '/crearActualizarJugadorEquipo', peticion, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    validarJugadorInterligas (enteJuridico: number, identificacion: string, interligas: string, codigoLiga: number, codigoEquipo: number, esCreacion: boolean, codigoEquipoJugador: number): Observable<PeticionEquipoJugador> {
      return this.http.get(this.urlServices + '/validarJugadorInterligas/'+enteJuridico+'/'+identificacion+'/'+interligas+'/'+codigoLiga+'/'+codigoEquipo + '?esCreacion=' + esCreacion + '&codigoEquipoJugador=' + (codigoEquipoJugador ? codigoEquipoJugador : -1))
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    eliminarJugadorGeneral (jugadorEquipo: EquipoJugador) {
      return this.http.delete(this.urlServices + '/eliminarJugadorGeneral/' + jugadorEquipo.enteJuridico +'/'+ jugadorEquipo.codigoEquipo +'/'+ jugadorEquipo.codigoJugador)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    eliminarEquipoGeneral (equipo: Equipo) {
      return this.http.delete(this.urlServices + '/eliminarEquipoGeneral/' + equipo.enteJuridico +'/'+ equipo.codigoEquipo)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
    }

    obtenerDisciplinasEquipos(enteJuridico: number, codigoEquipoJugador: number): Observable<EquipoJugadorDisciplina[]> {
      return this.http.get(this.urlServices + '/disciplinasEquipoJugador/' + enteJuridico + '/' + codigoEquipoJugador)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));;
    }
}
