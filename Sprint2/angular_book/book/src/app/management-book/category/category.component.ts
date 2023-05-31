import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {Title} from '@angular/platform-browser';
import {BookService} from '../../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../service/token-storage.service';
import {ShareService} from '../../service/share.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from "../../model/category";
import {CartService} from "../../service/cart.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categorySearch = '';
  nameSearch = '';
  bookList: Book [] = [];
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  bookLists: Book [];
  categoryList: Category[];
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
              private tokenStorageService: TokenStorageService,
              private category: BookService,
              private route: Router,
              private shareService: ShareService,
              private activatedRoute: ActivatedRoute) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.title.setTitle('Trang chủ');
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
    this.bookService.getBook().subscribe(next => {
      this.bookList = next;
    });

    this.category.getCategory().subscribe(next => {
      this.categoryList = next;
    });

    this.getListCategory();
    this.loadHeader();
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
      this.getListCategory();
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

  previousPage(event: any) {
    event.preventDefault();
    if (this.indexPagination > 0) {
      this.indexPagination--;
      this.getListCategory();
    }
  }

  nextPage(event: any) {
    event.preventDefault();
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.indexPagination++;
      this.getListCategory();
    }
  }

  getListCategory() {
    this.activatedRoute.paramMap.subscribe(param => {
      this.bookService.getListCategory(this.pageSize, +param.get('id'), param.get('search')).subscribe((data?: any) => {
        console.log(data);
        if (data === null) {
          this.totalPage = new Array(0);
          this.bookLists = [];
          this.displayPagination = 'none';
          console.log("null");
        } else {
          this.number = data?.number;
          this.pageSize = data?.size;
          this.numberOfElement = data?.numberOfElements;
          this.bookLists = data?.content;

          console.log(this.bookList + ' ok');
          this.totalElements = data?.totalElements;
          this.totalPage = new Array(Math.ceil(this.totalElements / this.pageSize));
        }
        this.checkPreviousAndNext();
      }, error => {
        this.bookList = null;
      });
    });
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else {
      this.nextPageStyle = 'none';
    }
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
  //   Swal.fire('Thông Báo !!', 'Thêm Vào Giỏ Hàng Thành Công', 'success').then(() => {
  //
  //   });
  // }


}
