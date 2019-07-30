import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Array<any> = [];
  public detail: Array<any> = [];


  constructor(private swa: SweetAlertService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.swa.loading('Obteniendo carrito de compras.');

    this.orders = [];

    let orders: any = localStorage.getItem('orders');
    if(orders){
      this.orders = JSON.parse(orders);
      orders = JSON.parse(orders);
    }else{
      this.orders = [];
      orders = [];
    }

    console.log(this.orders);

    this.swa.close();
  }

  getDetail(index){
    let products: any = localStorage.getItem('products');
    if(products){
      products = JSON.parse(products);
    }else{
      products = [];
    }

    this.detail = [];

    let order = this.orders[index];

    console.log(order);
    for(let i = 0; i < order.length; i++){
      for(let j = 0; j < products.length; j++){
        if(order[i].key == products[j].key){
          products[j].pieces = order[i].pieces;
          this.detail.push(Object.assign({}, products[j]));
        }
      }
    }

    console.log(this.detail);

  }
}