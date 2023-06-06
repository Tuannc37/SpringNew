import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {AuthService} from "./auth.service";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {CartDetail} from "../model/cartDetail";
import {catchError, switchMap, tap} from "rxjs/operators";
import {CartSummary} from "../model/cart-summary";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpOption: any;
  totalQuantitySubject: Subject<number> = new Subject<number>();

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService,
              private authenticationService: AuthService) {
  }

  getTotalQuantityObservable(): Observable<number> {
    return this.totalQuantitySubject.asObservable();
  }


  getCartItems(): Observable<CartDetail[]> {
    this.httpOption = this.authenticationService.getHttpOption();

    // @ts-ignore
    return this.httpClient.get<CartDetail[]>('http://localhost:8080/api/public/cart?username='
      + this.tokenStorageService.getUserName(),this.httpOption);
  }

  addToCart(itemId: number): Observable<any> {
    const cartItem = {
      book: {
        id: itemId,
      },
      user: {
        id: this.tokenStorageService.getId()
      }
    };

    return this.httpClient.post('http://localhost:8080/api/public/cart/save', cartItem, this.authenticationService.getHttpOption()).pipe(
      switchMap(() => {
        return this.getTotalQuantity().pipe(
          tap(totalQuantity => {
            const updatedQuantity = totalQuantity;
            console.log(updatedQuantity);
            // @ts-ignore
            this.totalQuantitySubject.next(updatedQuantity);
          }),
          catchError(() => of(0))
        );
      })
    );
  }

  getTotalQuantity() {
    const id = this.tokenStorageService.getId();
    return this.httpClient.get<number>(`http://localhost:8080/api/public/cart/quantity?idUser=${id}`,this.authenticationService.getHttpOption()).pipe(
      catchError(() => of(0))
    );
  }


  delete(item: CartDetail) {
    return this.httpClient.post('http://localhost:8080/api/public/cart/delete', item,this.authenticationService.getHttpOption())
  }

  updateAll(items: CartDetail[]) {
    return this.httpClient.post('http://localhost:8080/api/public/cart/update-all', items,this.authenticationService.getHttpOption())
  }

  pay(selected: CartDetail[]) {
    return this.httpClient.post('http://localhost:8080/api/public/cart/pay', selected,this.authenticationService.getHttpOption())
  }

  getListManageCart(page: number): Observable<any> {
    return this.httpClient.get<CartDetail[]>('http://localhost:8080/api/public/cart/list/summary?page=' + page);
  }

  updateInvoiceStatusToPaid(invoiceId: number) {
    const url = `http://localhost:8080/api/public/cart/invoices/${invoiceId}`;
    return this.httpClient.post<void>(url, {});
  }

  getListInvoiceUser(page: number, name: string): Observable<CartSummary[]> {
    return this.httpClient.get<CartSummary[]>('http://localhost:8080/api/public/cart/invoices/user?username=' + name + '&page=' + page);
  }

  calculateTotalProfit(){
    return this.httpClient.get('http://localhost:8080/api/public/cart/total-profit')
  }

  getTotalQuantityAllInvoice(){
    return this.httpClient.get('http://localhost:8080/api/public/cart/total-quantity')
  }

  countTotalUsers(){
    return this.httpClient.get('http://localhost:8080/api/public/cart/total-users')
  }

  countTotalBooks(){
    return this.httpClient.get('http://localhost:8080/api/public/book/total')
  }

}
