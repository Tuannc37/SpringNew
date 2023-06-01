import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {AuthService} from "./auth.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CartDetail} from "../model/cartDetail";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // constructor() { }
  //
  // getCart() {
  //   const cartJson = localStorage.getItem('cart');
  //   if (cartJson) {
  //     return JSON.parse(cartJson);
  //   } else {
  //     return [];
  //   }
  // }
  //
  // saveCart(carts: any) {
  //   const cartJson = JSON.stringify(carts);
  //   localStorage.setItem('cart', cartJson);
  // }
  //

  //
  // getTotalQuantity() {
  //   const carts = this.getCart();
  //   let total = 0;
  //   carts.forEach((item: any) => {
  //     total += item.quantity;
  //   });
  //   return total;
  // }

  httpOption: any

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService,
              private authenticationService: AuthService) {
  }


  getCartItems(): Observable<CartDetail[]> {
    this.httpOption = this.authenticationService.getHttpOption();

    // @ts-ignore
    return this.httpClient.get<CartDetail[]>('http://localhost:8080/api/public/cart?username='
      + this.tokenStorageService.getUserName(),this.httpOption);
  }
  getTotalPrice() {
    const carts = this.getCartItems();
    let total = 0;
    carts.forEach((item: any) => {
      const price = parseFloat(item.book.price);
      total += item.quantity * price;
    });
    console.log("Total");
    console.log(total);
    return total;
  }

  addToCart(id: number) {
    const cartItem = {
      book: {
        id: id
      },
      user: {
        id: this.tokenStorageService.getId()
      }
    }
    return this.httpClient.post('http://localhost:8080/api/public/cart/save', cartItem,this.authenticationService.getHttpOption())
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

}
