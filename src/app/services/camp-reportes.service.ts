import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams, ResponseContentType, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { SisCampProperties } from '../propiedades';
import { VistaJugador } from 'app/model/reportes/vista-jugador';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let fileSaver = require('file-saver');

@Injectable()
export class CampReportesService {
  urlServices: string = SisCampProperties.URL_SERVIDOR + '/rs/reportes';
  constructor(private http: Http) { }

  downloadFile(request: any) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, method: RequestMethod.Post, responseType: ResponseContentType.Blob});

    return this.http.post(this.urlServices + '/consultaJugadores', JSON.stringify(request), options)
        .subscribe(
          (response) => {
                let blob = new Blob([response.blob()], {type: 'application/octet-stream'});
                let filename = 'file.xlsx';
                fileSaver.saveAs(blob, filename);
        });
  }

  consultaJugadores (request: any): Observable<VistaJugador[]>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.urlServices + '/consultaJugadoresCriterio', JSON.stringify(request), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));
  }

  /*private extractContent(res: Response) {
    let blob: Blob = res.blob();
    window['saveAs'](blob, 'test.xls');
  }*/
}
