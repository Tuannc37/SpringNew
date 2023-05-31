import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from "../model/book";
import {Category} from '../model/category';
import {environment} from '../../environments/environment';
import {Discount} from '../model/discount';
import {AppUser} from '../model/appUser';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }
  save(book): Observable<Book> {
    return this.http.post<Book>(`${API_URL}/book/create`, book);
  }

  saveUser(appUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${API_URL}/book/create-user`, appUser);
  }

  findById(id: number): Observable<Book> {
    return this.http.get(`${API_URL}/book/${id}`);
  }

  update(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_URL}/book/edit/${id}`, book);
  }

  updateUser(id: number, appUser: AppUser): Observable<AppUser>{
    return this.http.put<AppUser>(`${API_URL}/book/list/users/update/${id}`, appUser);
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/book/list/category`);
  }

  getDiscount(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${API_URL}/book/list/discount`);
  }

  getBook(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_URL}/book/list/book`);
  }

  getUser(username: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${API_URL}/book/list/user/` + username);
  }

  findByIdUser(id: number): Observable<any> {
    return this.http.get(`${API_URL}/book/search/user/${id}`);
  }

  getListCategory(page: number, id: number , category: string): Observable<Category[]> {
      return this.http.get<Category[]>(API_URL + '/book/list/categorySearch?size=' + page + '&category=' + id);
  }

  getListAndSearch(page: number, name: string , category: string): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list?page=' + page + '&name=' + name + '&category=' + category);
  }

  getListPreview(page: number, name: string , category: string): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list/book/preview?page=' + page + '&name=' + name + '&category=' + category);
  }

  getListByOrderByReleaseDateDesc(page: number): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list/book/releaseDate?page=' + page);
  }

  getListHotBook(page: number): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list/book/hotBook?page=' + page);
  }

  getListBookSale(page: number): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list/book/sale?page=' + page);
  }


  getListByOrderByNumberBookSoldDesc(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + '/book/list/book/numberBookSoldDesc');
  }

  getListBookFindNameOfAuthor(page: number, name: string): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list/book/search?page=' + page + '&name=' + name);
  }


  delete(id: number): Observable<Book> {
    return this.http.delete<Book>(`${API_URL}/book/delete/${id}`);
  }

  checkDate(date: string): Observable<string> {
    return this.http.get<string>(API_URL + '/book/date/' + date);
  }

  getCart() {
    const cartJson = sessionStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

}
