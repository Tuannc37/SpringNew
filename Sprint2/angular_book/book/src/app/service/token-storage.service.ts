import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginResponse} from "../model/login-response";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() {
  }

  localStorageSave(loginResponse: LoginResponse) {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("TOKEN",loginResponse.jwt);
    localStorage.setItem("USERNAME",loginResponse.username);
    localStorage.setItem("ROLE",JSON.stringify(loginResponse.roles));
    localStorage.setItem("ID",String(loginResponse.id));
  }

  sessionStorageSave(loginResponse: LoginResponse) {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem("TOKEN",loginResponse.jwt);
    sessionStorage.setItem("USERNAME",loginResponse.username);
    sessionStorage.setItem("ROLE",JSON.stringify(loginResponse.roles));
    sessionStorage.setItem("ID",String(loginResponse.id));
  }


  signOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveTokenLocal(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenSession(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    if (window.localStorage.getItem(TOKEN_KEY) !== null) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }

  public saveUserLocal(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveUserSession(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    if (window.localStorage.getItem(USER_KEY) !== null) {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } else {
      return JSON.parse(sessionStorage.getItem(USER_KEY));
    }
  }

  getId(){
    if (localStorage.getItem("ID") != undefined){
      return localStorage.getItem('ID');
    }else {
      return sessionStorage.getItem('ID');
    }
  }

  // getToken(){
  //   if (localStorage.getItem("TOKEN") != null){
  //     return localStorage.getItem('TOKEN');
  //   }else {
  //     return sessionStorage.getItem('TOKEN');
  //   }
  // }

  getUserName(){
    if (localStorage.getItem("USERNAME") != undefined){
      return localStorage.getItem('USERNAME');
    }else {
      return sessionStorage.getItem('USERNAME');
    }
  }

  getRole(){
    if (localStorage.getItem("ROLE") != undefined){
      return localStorage.getItem('ROLE');
    }else {
      return sessionStorage.getItem('ROLE');
    }
  }
}
