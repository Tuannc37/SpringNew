import { Component, OnInit } from '@angular/core';
import {BookService} from '../service/book.service';
import {TokenStorageService} from '../service/token-storage.service';
import Swal from "sweetalert2";
import {Book} from "../model/book";
import {Title} from "@angular/platform-browser";
import {CartService} from "../service/cart.service";
import {DataService} from "../service/data.service";
import {CartDetailsService} from "../service/cart-details.service";
import {render, RenderParams} from "creditcardpayments/creditCardPayments";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AppUser} from "../model/appUser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartDetail} from "../model/cartDetail";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any = [];
  book: Book;
  user: any;
  username: any;
  currentDate: Date;
  transportFee: any = 20000;
  totalAmount: number = 0;
  userUpdateForm: FormGroup;
  id: number;
  userSelected: any = null;
  items: CartDetail[];
  selected: CartDetail[] = [];
  totalPrice: number = 0;
  renderParam?: RenderParams;
  totalQuantity: any = 0;


  constructor(private cartService: CartService,
              private dataService: DataService,
              private cartDetailService: CartDetailsService,
              private bookService: BookService,
              private route: Router,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private title: Title) {
    this.title.setTitle('Giỏ Hàng');
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.getCartItems();
    this.loadTotalQuantity();
    this.loadHeader();
    this.bookService.getUser(this.username).subscribe(next => {
      this.user = next;
      console.log(next);

    });
    this.userForm();
    this.bookService.getUser(this.username).subscribe(
      (user) => {
        if (user && user.id) {
          this.user = user;
          this.getUser(this.user.id);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  getUser(id) {
    this.bookService.findByIdUser(id).subscribe(appUser => {
      this.userForm();
      this.userUpdateForm.patchValue(appUser);
    });
  }

  payment(){
    document.getElementById('paypal').innerHTML = "";
    this.renderParam = {
      id: '#paypal',
      currency: 'USD',
      value: String(((this.totalAmount) / 23000).toFixed(2)),
      onApprove: details => {
        this.cartService.updateAll(this.items).subscribe();
        this.selected.map(item => item.status = 0)
        this.cartService.pay(this.selected).subscribe(ok => {
          this.getCartItems();
        });

        Swal.fire('Thanh toán','Thanh toán thành công, hãy kiểm tra đơn hàng của bạn','success')
      }
    }
  }

  // payment() {
  //   document.getElementById('paypal').innerHTML = "";
  //   const username = this.tokenStorageService.getUser().username;
  //   render({
  //     id: '#paypal',
  //     currency: 'USD',
  //     value: String(((this.totalAmount) / 23000).toFixed(2)),
  //     onApprove: () => {
  //       for (const item of this.carts) {
  //         item.book = {
  //           id: item.id
  //         };
  //       }
  //       this.cartDetailService.saveCartDetail(username, this.carts).subscribe();
  //       Swal.fire('Thông Báo !!', 'Thanh Toán Thành Công. <br>Sách Của Bạn Sẽ Được Giao Trong Vòng 3 Ngày Tới', 'success').then();
  //       this.carts = [];
  //       this.cartService.updateAll(this.carts);
  //     }
  //   });
  // }

  loadTotalQuantity(): void {
    this.cartService.getTotalQuantity().subscribe(
      totalQuantity => {
        this.totalQuantity = totalQuantity;
      },
      error => {
        this.totalQuantity = 0;
      }
    );
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.username);
    }
  }

  addCurrencySymbol(value: number): string {
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const symbolIndex = formattedValue.lastIndexOf('₫');
    return formattedValue.slice(0, symbolIndex) + '₫';
  }

  private userForm() {
    this.userUpdateForm = new FormGroup({
      id: new FormControl(''),
      fullName: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),});
  }

  updateSubmit(id) {
    const updatedUser = this.userUpdateForm.value;
    const userToUpdate = { ...this.user, ...updatedUser };
    this.bookService.updateUser(id, userToUpdate).subscribe(() => {
      Swal.fire('Sửa Thông Tin Thành Công !');
    }, e => console.log(e));
  }

  openModal(user: any) {
    this.userSelected = user;
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.items = items;
      this.dataService.changeCartItemsAmount(this.items.length)
    });
  }

  select(item: CartDetail) {
    if (this.selected.includes(item)) {
      this.selected.splice(this.selected.indexOf(item), 1);
    } else {
      this.selected.push(item);
    }
    this.totalPrice = 0;
    let hasSelectedItems = false;
    this.selected.forEach(book => {
      this.totalPrice += book.quantity * parseFloat(book.book.price);
      hasSelectedItems = true;
    });

    if (!hasSelectedItems) {
      this.totalAmount = 0;
    } else {
      this.totalAmount = this.totalPrice - 20000;
    }
    this.renderParam.value = String((this.totalPrice * 0.000042).toFixed(2));
  }

  increase(i: number) {
    this.items[i].quantity = this.items[i].quantity + 1;
    this.totalPrice = 0;
    this.selected.forEach(book => {
      this.totalPrice += book.quantity * parseFloat(book.book.price);
      this.totalAmount = this.totalPrice - 20000;
    });
    this.renderParam.value = String((this.totalPrice * 0.000042).toFixed(2));
  }

  decrease(i: number) {
    if (this.items[i].quantity > 1) {
      this.items[i].quantity = this.items[i].quantity - 1;
    }
    this.totalPrice = 0;
    this.selected.forEach(book => {
      this.totalPrice +=  book.quantity * parseFloat(book.book.price);
      this.totalAmount = this.totalPrice - 20000;
    });
    this.renderParam.value = String((this.totalPrice * 0.000042).toFixed(2));
  }

  callToast(item: CartDetail) {
    Swal.fire({
      title: 'Xóa',
      text: 'Bạn có chắc chắn muốn xóa sách này không',
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Có',
      showCancelButton: true,
    }).then(result => {
      this.cartService.delete(item).subscribe(ok => {
        this.cartService.getCartItems().subscribe(items => {
          this.items = items;
        });
        this.dataService.changeCartItemsAmount(this.items.length);
        this.toast.success('Xóa thành công');
      });
    });
  }

  ngOnDestroy(): void {
    this.cartService.updateAll(this.items).subscribe();
  }

  increaseQuantity(i: number) {
    this.items[i].quantity = this.items[i].quantity + 1;
    this.totalQuantity = this.calculateTotalQuantity();
  }

  decreaseQuantity(i: number) {
    if (this.items[i].quantity > 1) {
      this.items[i].quantity = this.items[i].quantity - 1;
      this.totalQuantity = this.calculateTotalQuantity();
    }
  }

  calculateTotalQuantity(): number {
    let totalQuantity = 0;
    this.selected.forEach(book => {
      totalQuantity += book.quantity;
    });
    return totalQuantity;
  }


}
