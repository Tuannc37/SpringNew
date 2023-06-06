import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {Title} from "@angular/platform-browser";
import {BookService} from "../../service/book.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../service/cart.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../service/share.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {AppUser} from "../../model/appUser";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userList: AppUser [] = [];
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
  totalProfit: number;
  totalQuantityAllInvoice: number;
  totalUsers: number;
  totalBooks: number;

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
    this.getListUser();
    this.loadHeader();
    this.calculateTotalProfit();
    this.countTotalUsers();
    this.getTotalQuantityAllInvoice()
    this.countTotalBooks();
  }


  getListUser() {
    this.bookService.getListUser(this.indexPagination).subscribe((data?: any) => {
      this.totalPage = new Array(data?.totalPages);
      if (data === null) {
        this.totalPage = new Array(0);
        this.userList = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.userList = data?.content;
        console.log(this.userList + ' ok');
        this.totalElements = data?.totalElements;
      }
      this.checkPreviousAndNext();
    }, error => {
      this.userList = null;
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

  calculateTotalProfit(): void {
    this.cartService.calculateTotalProfit().subscribe(
      data => {
        this.totalProfit = <number>data;
      },
      error => {
        this.totalProfit = 0;
      }
    );
  }

  getTotalQuantityAllInvoice(): void {
    this.cartService.getTotalQuantityAllInvoice().subscribe(
      data => {
        this.totalQuantityAllInvoice = <number>data;
      },
      error => {
        this.totalQuantityAllInvoice = 0;
      }
    );
  }

  countTotalUsers(): void {
    this.cartService.countTotalUsers().subscribe(
      data => {
        this.totalUsers = <number>data;
      },
      error => {
        this.totalUsers = 0;
      }
    );
  }

  countTotalBooks(): void {
    this.cartService.countTotalBooks().subscribe(
      data => {
        this.totalBooks = <number>data;
      },
      error => {
        this.totalBooks = 0;
      }
    );
  }

  addCurrencySymbol(value: number): string {
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const symbolIndex = formattedValue.lastIndexOf('₫');
    return formattedValue.slice(0, symbolIndex) + '₫';
  }

}
