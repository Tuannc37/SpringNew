import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {Title} from "@angular/platform-browser";
import {BookService} from "../../service/book.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../service/cart.service";
import {DataService} from "../../service/data.service";
import {ShareService} from "../../service/share.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import Swal from "sweetalert2";
import {CartDetail} from "../../model/cartDetail";
import {CartSummary} from "../../model/cart-summary";

@Component({
  selector: 'app-list-manage-cart',
  templateUrl: './list-manage-cart.component.html',
  styleUrls: ['./list-manage-cart.component.css']
})
export class ListManageCartComponent implements OnInit {

  ManageCartList: CartSummary [] = [];
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
              private cartService: CartService,
              private dataService: DataService,
              private shareService: ShareService,
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
    this.getListManageCart();
    this.loadHeader();
  }


  getListManageCart() {
    this.cartService.getListManageCart(this.indexPagination).subscribe((data?: any) => {
      this.totalPage = new Array(data?.totalPages);
      console.log("AAAAAAAAAAAAAAÂ")
      console.log(data);
      if (data === null) {
        this.totalPage = new Array(0);
        this.ManageCartList = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.ManageCartList = data?.content;
        console.log(this.ManageCartList + ' ok');
        this.totalElements = data?.totalElements;
      }
      this.checkPreviousAndNext();
    }, error => {
      this.ManageCartList = null;
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

  addCurrencySymbol(value: number): string {
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const symbolIndex = formattedValue.lastIndexOf('₫');
    return formattedValue.slice(0, symbolIndex) + '₫';
  }



}
