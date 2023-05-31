import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBookComponent} from './list-book/list-book.component';
import {CreateBookComponent} from './create-book/create-book.component';
import {AuthGuard} from '../login/auth.guard.';
import {CategoryComponent} from './category/category.component';
import {ListPreviewComponent} from "./list-preview/list-preview.component";
import {ListSearchComponent} from "./list-search/list-search.component";
import {HomeComponent} from "../body/home.component";
import {ListNewComponent} from "./list-new/list-new.component";
import {HotBookComponent} from "./hot-book/hot-book.component";
import {ListBookSaleComponent} from "./list-book-sale/list-book-sale.component";
import {UserCreatComponent} from "../info/user-creat/user-creat.component";


const routes: Routes = [
  {
    path: 'create',
    component: CreateBookComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'list',
    component: ListBookComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },

  {
    path: 'listPreview',
    component: ListPreviewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },

  {
    path: 'listSearch',
    component: ListSearchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },

  {
    path: 'listNewBook',
    component: ListNewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },

  {
    path: 'listHotBook',
    component: HotBookComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },

  {
    path: 'listBookSale',
    component: ListBookSaleComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },


  {
    path: 'category/:id',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
