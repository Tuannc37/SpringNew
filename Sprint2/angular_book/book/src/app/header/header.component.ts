import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {BookService} from '../service/book.service';
import {Category} from '../model/category';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DataService} from "../service/data.service";
import Swal from "sweetalert2";
import {Book} from "../model/book";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  currentUser: string;
  role: string;
  isLoggedIn = false;
  categoryList: Category[];
  bookList: Book [] = [];
  id: number;
  totalQuantity: any = 0;
  number: number;
  totalPage: string[];
  totalElements = 0;
  name: string;
  searchForm: any;


  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private category: BookService,
              private bookService: BookService,
              private route: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService) {
    this.searchForm = this.formBuilder.group({
      name: ['']
    });
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
    this.dataService.getData.subscribe((result: any) => {
      this.totalQuantity = parseInt(result.quantity, 10);
    });
    this.category.getCategory().subscribe(next => {
      this.categoryList = next;
    });

  }

  getId(id: number) {
   this.route.navigateByUrl('category/' + id);
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }

  logOut() {
    this.tokenStorageService.signOut();
  }


  searchBook() {
    const name = this.searchForm.value.name;
    this.route.navigate(['listSearch'], { queryParams: { name: name } });
  }
}
