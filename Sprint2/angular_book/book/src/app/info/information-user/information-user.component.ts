import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {AppUser} from '../../model/appUser';
import {TokenStorageService} from '../../service/token-storage.service';
import {CartService} from "../../service/cart.service";
import {CartSummary} from "../../model/cart-summary";

@Component({
  selector: 'app-information-user',
  templateUrl: './information-user.component.html',
  styleUrls: ['./information-user.component.css']
})
export class InformationUserComponent implements OnInit {
  user: any;
  username: any;
  number: number;
  cartUserList: CartSummary [] = [];
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  displayPagination = 'inline-block';
  role: string;
  isLoggedIn = false;

  constructor(private bookService: BookService,
              private cartService: CartService,
              private tokenStorageService: TokenStorageService) {
  }


  ngOnInit(): void {
    this.loadHeader();
    this.bookService.getUser(this.username).subscribe(next => {
      this.user = next;
      console.log(next);
    });
    this.getListInvoicesUser();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      console.log(this.user);
    }

    this.isLoggedIn = this.username != null;
  }

  loadInvoices(username: string, page: number) {
    this.cartService.getListInvoiceUser(this.indexPagination,this.username)
      .subscribe(data => {
        this.cartUserList = data;
      });
  }

  getListInvoicesUser() {
    this.cartService.getListInvoiceUser(this.indexPagination,this.username).subscribe((data?: any) => {
      console.log("AAAAA")
      console.log(data);
      this.totalPage = new Array(data?.totalPages);
      if (data === null) {
        this.totalPage = new Array(0);
        this.cartUserList = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.cartUserList = data?.content;
        console.log(this.cartUserList + ' ok');
        this.totalElements = data?.totalElements;
      }
      this.checkPreviousAndNext();
    }, error => {
      this.cartUserList = null;
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

  Number(price: string) {
    return parseFloat(price);
  }

}
