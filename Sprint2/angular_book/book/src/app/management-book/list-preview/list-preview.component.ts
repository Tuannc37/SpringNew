import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../model/book";
import {Category} from "../../model/category";
import {Title} from "@angular/platform-browser";
import {BookService} from "../../service/book.service";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-list-preview',
  templateUrl: './list-preview.component.html',
  styleUrls: ['./list-preview.component.css']
})
export class ListPreviewComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormGroup({
      name: new FormControl('')
    })
  });

  categorySearch = '';
  nameSearch = '';
  bookList: Book [] = [];
  categoryList: Category [] = [];
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
              private dataService: DataService,
              private cartService: CartService,
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
    this.searchBook();
    this.getListPreview();
    this.getCategoryList();
    this.loadHeader();
  }

  getCategoryList() {
    this.bookService.getCategory().subscribe(data => {
      this.categoryList = data;
    });
  }

  getListPreview() {
    this.bookService.getListPreview(this.indexPagination, this.categorySearch,
      this.nameSearch).subscribe((data?: any) => {
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


  searchBook() {
    this.categorySearch = this.searchForm.value.category.name;
    this.nameSearch = this.searchForm.value.name;
    this.getListPreview();
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
      this.getListPreview();
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
