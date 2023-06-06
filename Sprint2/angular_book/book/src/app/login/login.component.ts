import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../service/share.service';
import Swal from 'sweetalert2';
import {CookieService} from 'ngx-cookie-service';
import {BookService} from '../service/book.service';
import {AppUser} from '../model/appUser';
import {LoginResponse} from "../model/login-response";
import {CartService} from "../service/cart.service";
import {DataService} from "../service/data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  roles: string[] = [];
  username: string;
  returnUrl: string;
  user: any;
  loginResponse: LoginResponse;
  rememberMe = false;


  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,
              private dataService: DataService,
              private toastr: ToastrService,
              private shareService: ShareService,
              private cookieService: CookieService,
              private bookService: BookService) {
  }

  ngOnInit(): void {
    this.loadHeader();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );

    if (this.tokenStorageService.getToken()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.user = this.tokenStorageService.getUser().username;
    }
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser().username;
      console.log(this.user);
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(data => {

      this.loginResponse = data;
      if (this.rememberMe){
        this.tokenStorageService.localStorageSave(data);
      }else {
        this.tokenStorageService.sessionStorageSave(data);
      }

      if (this.formGroup.value.remember_me === true) {
        this.tokenStorageService.saveTokenLocal(data.token);
        this.tokenStorageService.saveUserLocal(data);
      } else {
        this.tokenStorageService.saveTokenSession(data.token);
        this.tokenStorageService.saveUserSession(data);
      }

      this.authService.isLoggedIn = true;
      this.getCartItems()
      this.username = this.tokenStorageService.getUser().username;
      this.roles = this.tokenStorageService.getUser().roles;
      this.formGroup.reset();
      this.router.navigateByUrl(this.returnUrl);
      this.router.navigateByUrl('');
      Swal.fire({
        title: 'Thông Báo!',
        text: 'Đăng Nhập Thành Công',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.shareService.sendClickEvent();

    }, err => {
      this.authService.isLoggedIn = false;
      this.toastr.error('Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt', 'Đăng nhập thất bại: ', {
        timeOut: 3000,
        extendedTimeOut: 1500
      });
    });
  }

  getCartItems(){
    this.cartService.getCartItems().subscribe(amount => {
      this.dataService.changeCartItemsAmount(amount.length)
    })
  }

}
