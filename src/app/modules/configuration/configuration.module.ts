import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HomeListComponent } from './home/home-list.component';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    UsersListComponent,
    ProductsListComponent,
    HomeListComponent,
    ShoppingCartListComponent,
    OrdersComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
  ]
})
export class ConfigurationModule { }