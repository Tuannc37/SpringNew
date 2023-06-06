import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import {ListBookComponent} from './list-book/list-book.component';
import {CreateBookComponent} from './create-book/create-book.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CategoryComponent } from './category/category.component';
import { ListPreviewComponent } from './list-preview/list-preview.component';
import { ListSearchComponent } from './list-search/list-search.component';
import { ListNewComponent } from './list-new/list-new.component';
import { HotBookComponent } from './hot-book/hot-book.component';
import { ListBookSaleComponent } from './list-book-sale/list-book-sale.component';
import { ListManageCartComponent } from './list-manage-cart/list-manage-cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ListBookComponent,
    CreateBookComponent,
    CategoryComponent,
    ListPreviewComponent,
    ListSearchComponent,
    ListNewComponent,
    HotBookComponent,
    ListBookSaleComponent,
    ListManageCartComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BookRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class BookModule { }
