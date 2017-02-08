import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { SisCampProperties } from '../propiedades';
import { Login } from '../model/seguridad/login';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

  urlServices: string = SisCampProperties.URL_SERVIDOR + '/rs/seguridades';

  public token: string;

  constructor(private http: Http) {
      // set token if saved in local storage
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }

  login(enteJuridico: number, username: string, password: string): Observable<Login> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.urlServices + '/login', JSON.stringify({ usuario: username, password: password, entejuridico: enteJuridico }), options)
        .map((response: Response) => {
          let data = response.json();
          data.token = response.headers.get('Authorization');
          localStorage.setItem('currentUser', JSON.stringify(data));
          return data;
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Error en el servidor'));

  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
  }

}
