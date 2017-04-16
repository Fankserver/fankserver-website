import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import {tokenNotExpired, AuthHttp, JwtHelper} from 'angular2-jwt';
import {Observable, Subject} from 'rxjs';
import {environment} from 'environments/environment';

const jwtHelper: JwtHelper = new JwtHelper();

@Injectable()
export class AuthService {
  public jwtExpiration: Subject<void> = new Subject<void>();
  public loggedIn = false;
  public decodedToken: any = null;

  constructor(private authHttp: AuthHttp, private http: Http) {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.loggedIn = (localStorage.getItem('id_token') && tokenNotExpired('id_token'))
    if (this.loggedIn) {
      this.decodedToken = jwtHelper.decodeToken(localStorage.getItem('id_token'));
    } else {
      this.decodedToken = null;
    }
  }

  setJWT(jwt: string) {
    if (jwt) {
      localStorage.setItem('id_token', jwt);
      const expireDate = jwtHelper.getTokenExpirationDate(jwt);
      setTimeout(
        () => {
          this.checkLoggedIn();
          this.jwtExpiration.next();
        },
        (expireDate.valueOf() - (new Date().valueOf()) + 2000)
      );
    } else {
      localStorage.removeItem('id_token');
    }
    this.checkLoggedIn();
  }

  // get(url: string, data: any) {
  //   return this.authHttp.get();
  // }

  post(url: string, body: Object): Observable<Response> {
    if (this.loggedIn) {
      return this.authHttp.post(
        environment.api + url,
        JSON.stringify(body)
      );
    } else {
      return this.http.post(
        environment.api + url,
        JSON.stringify(body)
      );
    }
  }
}
