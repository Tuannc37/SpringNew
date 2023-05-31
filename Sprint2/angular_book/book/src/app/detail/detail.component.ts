import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {Title} from '@angular/platform-browser';
import {BookService} from '../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AppUser} from '../model/appUser';
import Swal from "sweetalert2";
import {CartService} from "../service/cart.service";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bookId: number;
  bookList: Book [] = [];
  bookForm: FormGroup;
  carts: any = this.bookService.getCart();

  constructor(private title: Title,
              private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private dataService: DataService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = +paramMap.get('id');
      this.getId(this.bookId);
    });
    this.title.setTitle('Xem chi tiết');
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      publisher: new FormControl(''),
      totalPage: new FormControl(''),
      author: new FormControl(''),
      releaseDate: new FormControl(''),
      category: new FormControl(''),
      discount: new FormControl(''),
    });
  }

  getId(bookId: number) {
    this.bookService.findById(this.bookId).subscribe(next => {
      this.bookForm.patchValue(next);
    });
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
