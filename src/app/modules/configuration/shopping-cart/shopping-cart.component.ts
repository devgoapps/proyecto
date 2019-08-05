import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  public items: Array<any> = [];
  public shoppingCart: Array<any> = [];

  constructor(private swa: SweetAlertService) { }

  ngOnInit() {
    this.getShoppingCart();
  }

  getShoppingCart(){
    this.swa.loading('Obteniendo carrito de compras.');

    this.items = [];

    let products: any = localStorage.getItem('products');
    if(products){
      products = JSON.parse(products);
    }else{
      products = [];
    }

    let shoppingCart: any = localStorage.getItem('shoppingCart');
    if(shoppingCart){
      this.shoppingCart = JSON.parse(shoppingCart);
      shoppingCart = JSON.parse(shoppingCart);
    }else{
      this.shoppingCart = [];
      shoppingCart = [];
    }

    for(let i = 0; i < shoppingCart.length; i++){
      for(let j = 0; j < products.length; j++){
        if(shoppingCart[i].item == products[j].key){
          this.items.push(Object.assign({}, products[j]));
        }
      }
    }

    for(let i = 0; i < shoppingCart.length; i++){
      this.items[i].pieces = 1;
    }

    this.swa.close();
  }

  addPiece(index){
    this.items[index].pieces++;
  }

  removePiece(index){
    if(this.items[index].pieces > 1)
      this.items[index].pieces--;
  }

  removeProduct(index){
    this.swa.confirm('¿Deseas eliminar este producto de tu carrito?', '', (result) => {
      if(result.value){
        let item = this.items[index];

        for(let i = 0; i < this.shoppingCart.length; i++){
          if(this.shoppingCart[i].item == item.key){
            this.shoppingCart.splice(i, 1);
            localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));

            this.swa.success('Producto eliminado', '', () => {
              this.getShoppingCart();
            })
          }
        }
      }
    });
  }

  createOrder(){
    let orders: any = localStorage.getItem('orders');
    if(orders){
      orders = JSON.parse(orders);
    }else{
      orders = [];
    }

    let order = [];
    for(let i = 0; i < this.items.length; i++){
      let item = {
        key: this.items[i].key,
        pieces: this.items[i].pieces
      } 
      order.push(item)
    }
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    let products: any = localStorage.getItem('products');
    if(products){
      products = JSON.parse(products);
    }else{
      products = [];
    }

    for(let i = 0; i < order.length; i++){
      for(let j = 0; j < products.length; j++){
        if(order[i].key == products[j].key){
          products[j].stock = (products[j].stock - order[i].pieces);
        }
      }
    }

    localStorage.setItem('products', JSON.stringify(products));

    this.swa.success('Orden creada', '', () => {
      localStorage.removeItem('shoppingCart');
      this.items = [];
    })
  }

}