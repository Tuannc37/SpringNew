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
  totalAmount: any;

  appUser: AppUser;
  userUpdateForm: FormGroup;
  id: number;

  // totalPrice: number = this.cartService.getTotalPrice();
  // totalQuantity: number = this.cartService.getTotalQuantity();
  userSelected: any = null;

  //---------------
  items: CartDetail[];
  selected: CartDetail[] = [];
  totalPrice: number = 0;
  renderParam?: RenderParams;
  //-------------------

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

    //Mới thêm

    //Mới thêm

    this.totalAmount = this.totalPrice/1000-this.transportFee
  }

  ngOnInit(): void {
    const _this = this;
    // setTimeout(() => {
    //   _this.dataService.changeData({
    //     quantity: _this.cartService.getTotalQuantity()
    //   });
    // }, 1);
    // this.carts = this.cartService.getCart();
    // this.dataService.changeData({
    //   quantity: this.cartService.getTotalQuantity()
    // });

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

  total(cart: any) {
    return cart.quantity * cart.price;
  }
  //----------------------
  payment() {
    document.getElementById('paypal').innerHTML = "";
    const username = this.tokenStorageService.getUser().username;
    this.renderParam = {
      id: '#paypal',
      currency: 'VND',
      value: '0',
      onApprove: details => {
        this.cartService.updateAll(this.items).subscribe();
        this.selected.forEach(item => item.status = 0);
        this.cartService.pay(this.selected).subscribe(ok => {
          this.getCartItems();
        });

        Swal.fire('Thanh toán', 'Thanh toán thành công, hãy kiểm tra đơn hàng của bạn', 'success');
      }
    }
  }
  //-----------------------------------

  // updateQuantity(index: number, event: any) {
  //   let quantity = parseInt(event.target.value, 10);
  //   quantity = quantity > 0 ? quantity : 1;
  //   quantity = quantity <= 999 ? quantity : 999;
  //   event.target.value = quantity;
  //   this.carts[index].quantity = quantity;
  //   this.cartService.saveCart(this.carts);
  //   this.totalPrice = this.cartService.getTotalPrice();
  //   this.totalQuantity = this.cartService.getTotalQuantity();
  //   this.dataService.changeData({
  //     quantity: this.cartService.getTotalQuantity()
  //   });
  // }
  //
  // decrease(index: number, quantity: any) {
  //   let decreaseQuantity = parseInt(quantity, 10) - 1;
  //   decreaseQuantity = decreaseQuantity > 0 ? decreaseQuantity : 1;
  //   this.carts[index].quantity = decreaseQuantity;
  //   this.cartService.saveCart(this.carts);
  //   this.totalPrice = this.cartService.getTotalPrice();
  //   this.totalQuantity = this.cartService.getTotalQuantity();
  //   this.dataService.changeData({
  //     quantity: this.cartService.getTotalQuantity()
  //   });
  // }
  //
  // increase(index: number, quantity: any) {
  //   let increaseQuantity = parseInt(quantity, 10) + 1;
  //   increaseQuantity = increaseQuantity <= 999 ? increaseQuantity : 999;
  //   this.carts[index].quantity = increaseQuantity;
  //   this.cartService.saveCart(this.carts);
  //   this.totalPrice = this.cartService.getTotalPrice();
  //   this.totalQuantity = this.cartService.getTotalQuantity();
  //   this.dataService.changeData({
  //     quantity: this.cartService.getTotalQuantity()
  //   });
  // }
  //
  // deleteCart(index: number) {
  //   const _this = this;
  //   Swal.fire({
  //     title: 'Thông Báo !!',
  //     text: 'Bạn Muốn Xoá Sản Phẩm Này Khỏi Giỏ Hàng ?!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3F51B5',
  //     cancelButtonColor: '#F44336',
  //     confirmButtonText: 'Đồng Ý'
  //   }).then((result: any) => {
  //     if (result.isConfirmed) {
  //       Swal.fire('Thông Báo !!', 'Đã Xoá Sản Phẩm Khỏi Giỏ Hàng.', 'success').then();
  //       _this.carts.splice(index, 1);
  //       _this.cartService.saveCart(_this.carts);
  //       this.totalPrice = this.cartService.getTotalPrice();
  //       this.totalQuantity = this.cartService.getTotalQuantity();
  //       this.dataService.changeData({
  //         quantity: this.cartService.getTotalQuantity()
  //       });
  //     }
  //   });
  // }

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
  //       this.cartService.saveCart(this.carts);
  //       this.dataService.changeData({
  //         quantity: this.cartService.getTotalQuantity()
  //       });
  //
  //     }
  //   });
  // }

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
      // this.route.navigateByUrl('/customer/api');
      Swal.fire('Sửa Thông Tin Thành Công !');
    }, e => console.log(e));
  }


  openModal(user: any) {
    this.userSelected = user;
  }


  //---------------------------
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
    this.selected.forEach(book => {
      this.totalPrice += parseInt(book.quantity) * parseFloat(book.book.price);
    });
    this.renderParam.value = String((this.totalPrice * 0.000042).toFixed(2));
  }

  increase(i: number) {
    this.items[i].quantity = String(parseInt(this.items[i].quantity) + 1);
    this.totalPrice = 0;
    this.selected.forEach(book => {
      this.totalPrice += parseInt(book.quantity) * parseFloat(book.book.price);
    });
    this.renderParam.value = String((this.totalPrice * 0.000042).toFixed(2));
  }

  decrease(i: number) {
    if (parseInt(this.items[i].quantity) > 1) {
      this.items[i].quantity = String(parseInt(this.items[i].quantity) - 1);
    }
    this.totalPrice = 0;
    this.selected.forEach(book => {
      this.totalPrice += parseInt(book.quantity) * parseFloat(book.book.price);
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
}
