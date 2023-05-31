import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
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
  selector: 'app-hot-book',
  templateUrl: './hot-book.component.html',
  styleUrls: ['./hot-book.component.css']
})
export class HotBookComponent implements OnInit {

  bookList: Book [] = [];
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  displayPagination = 'inline-block';
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
              private shareService: ShareService,
              private dataService: DataService,
              private cartService: CartService,
              private route: Router,
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
    this.getListHotBook();
    this.loadHeader();
  }


  getListHotBook() {
    this.bookService.getListHotBook(this.indexPagination).subscribe((data?: any) => {
      this.totalPage = new Array(data?.totalPages);
      if (data === null) {
        this.totalPage = new Array(0);
        this.bookList = [];
        this.displayPagination = 'none';
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
      this.getListHotBook();
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

  // onAddToCart(book: any) {
  //   const index = this.carts.findIndex((item: any) => {
  //     return item.id === book.id;
  //   });
  //
  //   if (index >= 0) {
  //     this.carts[index].quantity += 1;
  //   } else {
  //     const cartItem: any = {
  //       id: book.id,
  //       name: book.name,
  //       price: book.price,
  //       quantity: 1,
  //       image: book.image,
  //     };
  //     this.carts.push(cartItem);
  //   }
  //
  //   this.cartService.saveCart(this.carts);
  //   this.dataService.changeData({
  //     quantity: this.cartService.getTotalQuantity()
  //   });
  //   Swal.fire('Thông Báo !!', 'Thêm Vào Giỏ Hàng Thành Công', 'success').then();
  // }

}
