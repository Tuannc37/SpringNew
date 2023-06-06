import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../model/book";
import {Category} from "../../model/category";
import {Title} from "@angular/platform-browser";
import {BookService} from "../../service/book.service";
import {ToastrService} from "ngx-toastr";
import {ShareService} from "../../service/share.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import Swal from "sweetalert2";
import {CartService} from "../../service/cart.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css']
})
export class ListSearchComponent implements OnInit {

  nameSearch = '';
  bookList: Book [] = [];
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  id: number;
  name: string;
  role: string;
  username: string;
  currentUser: string;
  isLoggedIn = false;
  carts: any = this.bookService.getCart();

  constructor(private title: Title,
              private bookService: BookService,
              private toast: ToastrService,
              private cartService: CartService,
              private dataService: DataService,
              private route: Router,
              private shareService: ShareService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });

    this.title.setTitle('Quản lý sách');
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const name = params.get('name');
    });

    this.getListFindAllNameOfAuthorBook();
    this.loadHeader();
  }

  getListFindAllNameOfAuthorBook() {
    this.activatedRoute.queryParamMap.subscribe(paramMap => {
      const name = paramMap.get('name') || this.nameSearch;
      console.log('Name:', name);
      this.bookService.getListBookFindNameOfAuthor(this.indexPagination, name).subscribe((data?: any) => {
        this.totalPage = [];
        console.log("Danh sách tìm kiếm:")
        console.log(data);
        if (data === null) {
          this.totalPage = new Array(0);
          this.bookList = [];
          Swal.fire({
            title: 'Tên bạn tìm không có trong danh sách !!',
            text: 'Vui Lòng Thử Lại',
            icon: 'error',
            confirmButtonText: 'Thử Lại'
          });
        } else {
          this.number = data?.number;
          console.log(this.number);
          this.pageSize = data?.size;
          this.numberOfElement = data?.numberOfElements;
          this.bookList = data?.content;
          console.log(this.bookList + ' ok');
          this.totalElements = data?.totalElements;
        }
        this.checkPreviousAndNext();
      }, error => {
        this.bookList = null;
      });
    });
  }


  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  deleteBook(temp: any) {
    this.id = temp.id;
    this.name = temp.name;
  }

  delete(id: number) {
    this.bookService.delete(id).subscribe(next => {
      Swal.fire({
        title: 'Thông Báo!',
        text: 'Xoá Thành Công',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.getListFindAllNameOfAuthorBook();
      this.ngOnInit();
    }, e => {
      Swal.fire({
        title: 'Đã Có Lỗi Xảy Ra !!',
        text: 'Vui Lòng Thử Lại',
        icon: 'error',
        confirmButtonText: 'Thử Lại'
      });
    });
  }

  addCurrencySymbol(value: number): string {
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const symbolIndex = formattedValue.lastIndexOf('₫');
    return formattedValue.slice(0, symbolIndex) + '₫';
  }

  Number(price: string) {
    return parseFloat(price);
  }

  addToCart(id: number) {
    this.cartService.addToCart(id).subscribe(data => {
      Swal.fire('Thông Báo !!', 'Thêm Vào Giỏ Hàng Thành Công', 'success').then();
      this.cartService.getCartItems().subscribe(items => {
        this.dataService.changeCartItemsAmount(items.length)
      })
    })
  }

}
