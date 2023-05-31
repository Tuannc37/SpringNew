import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./token-storage.service";

const AUTH_API = 'http://localhost:8080/api/public';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean;
  token: string;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(obj): Observable<any> {
    return this.httpClient.post(AUTH_API + '/login', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  resetPassword(username: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'reset-password', {
      username: username,
    }, this.httpOptions);
  }

  doResetPassword(password: string, name: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'do-reset-password/' + name, {
      password: password
    }, this.httpOptions);
  }

  getHttpOption(){
    console.log(this.tokenStorageService.getToken());
    this.token = this.tokenStorageService.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpOptions
  }
}
