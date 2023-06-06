import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {Router} from "@angular/router";
import {AppUser} from "../../model/appUser";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-user-creat',
  templateUrl: './user-creat.component.html',
  styleUrls: ['./user-creat.component.css']
})
export class UserCreatComponent implements OnInit {

  registerUser: FormGroup;

  appUser: AppUser;

  username: string;

  errorList: any;

  currentUser: string;
  role: string;
  isLoggedIn = false;

  validationMessages = {
    username: [
      {type: 'required', message: 'Vui lòng nhập tên tài khoản!'}
    ],
    fullName: [
      {type: 'required', message: 'Vui lòng nhập tên người dùng!'}
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại!'},
      {
        type: 'pattern',
        message: 'Vui lòng nhập số địa thoại đúng định dạng có  10 chữ số, bắt đầu bằng "090", "093" hoặc "097"'
      }
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập email!'},
      {
        type: 'pattern',
        message: 'Vui lòng nhập địa chỉ email khớp với mẫu "abc@gmail.com"'
      }
    ],
    address: [
      {type: 'required', message: 'Vui lòng nhập địa chỉ!'}
    ],
    creationDate: [
      {type: 'required', message: 'Vui lòng nhập ngày!'}
    ],
    password: [
      {type: 'required', message: 'Vui lòng nhập mật khẩu!'},
      {
        type: 'pattern',
        message: 'Mật khẩu tối thiểu 6 kí tự!'
      }
    ],

  };

  constructor(private bookService: BookService,
              private toastr: ToastrService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
    this.appUser = new AppUser();
    this.registerUser = new FormGroup({
      username: new FormControl('', [Validators.required]),

      fullName: new FormControl('', [Validators.required]),

      phone: new FormControl('', [Validators.required, Validators.pattern(/^(090|093|097)\d{7}$/)]),

      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@(gmail\.)+(com)$/)]),

      address:  new FormControl('', [Validators.required]),

      creationDate: new FormControl('', [Validators.required]),

      passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('')
      }, [this.checkPassword]),
    })
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  save() {
    if (this.registerUser.valid){
      let appUser1: AppUser = this.registerUser.value;
      appUser1.password = this.registerUser.controls.passwordGroup.get('password').value;
      appUser1.role = 'ROLE_USER';
      this.bookService.saveUser(appUser1).subscribe(next => {
        this.router.navigateByUrl("/login")
        this.toastr.success('Chúc mừng.Bạn đã đăng ký thành công!', 'Thông báo', {
          messageClass: 'center',
          positionClass: 'toast-top-center'
        });

      },error => {
        this.errorList = error.error
      })
    }
  }

  private checkPassword(passwordGroup: AbstractControl) {

    let password = passwordGroup.get('password').value;

    let passwordConfirm = passwordGroup.get('passwordConfirm').value;

    if (password !== passwordConfirm) {
      return {'checkPasswordConfirm': true};
    }
    return null;
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];

    }
    this.isLoggedIn = this.username != null;
  }

}
