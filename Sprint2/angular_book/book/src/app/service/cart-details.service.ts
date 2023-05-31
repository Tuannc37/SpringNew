import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {CartDetail} from "../model/cartDetail";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CartDetailsService {

  constructor(private http: HttpClient) {
  }

  saveCartDetail(username: string, cartDetail: CartDetail[]) {
    return this.http.post(API_URL + '/book/saveCart/' + username, cartDetail);
  }

  getHistory(username: string): Observable<History> {
    return this.http.get<History>(API_URL + '/book/history/' + username);
  }
}
