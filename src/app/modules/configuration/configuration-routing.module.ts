import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HomeListComponent } from './home/home-list.component';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent
  },
  {
    path: 'products-list',
    component: ProductsListComponent
  },
  {
    path: 'home-list',
    component: HomeListComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartListComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
