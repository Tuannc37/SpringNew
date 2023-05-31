import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject({
    quantity: 0
  });

  getData = this.data.asObservable();

  private isLogin = new BehaviorSubject(false);
  private isLoginModule = new BehaviorSubject(false);
  private previousUrl = new BehaviorSubject("");
  private cartItemsAmount = new BehaviorSubject(0);

  constructor() { }

  currentLoginStatus = this.isLogin.asObservable();
  currentLoginModuleStatus = this.isLoginModule.asObservable();
  currentPreviousUrl = this.previousUrl.asObservable();
  currentCartItemsAmount  = this.cartItemsAmount.asObservable();

  changeLoginStatus(status: boolean){
    this.isLogin.next(status);
  }

  changeLoginModuleStatus(status: boolean){
    this.isLoginModule.next(status);
  }

  changePreviousUrl(url: string){
    this.previousUrl.next(url);
  }

  changeCartItemsAmount (amount: number){
    this.cartItemsAmount.next(amount);
  }

  changeData(data: any) {
    this.data.next(data);
  }

}
