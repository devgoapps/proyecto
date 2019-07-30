import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  public products: Array<any> = [];
  public productIndex: number = 0;

  constructor(private swa: SweetAlertService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.swa.loading('Obteniendo productos.');

    let products = localStorage.getItem('products');
    if(products){
      this.products = JSON.parse(products);
    }
    this.swa.close();
  }

  addProduct(index){
    this.swa.confirm('¿Deseas agregar este producto a tu carrito?', '', (result) => {
      if(result.value){
        let hasItem = false;
        let item = Object.assign({}, this.products[index]);
        let shoppingCart: any = localStorage.getItem('shoppingCart');
        
        if(shoppingCart){
          shoppingCart = JSON.parse(shoppingCart);
        }else{
          shoppingCart = [];
        }
        for(let i = 0; i < shoppingCart.length; i++){
          if(shoppingCart[i].item == item.key){
            hasItem = true;
            this.swa.info('El producto ya esta agregado a tu carrito', '');
          }
        }
        if(!hasItem){
          shoppingCart.push({ item: item.key });
          localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
          this.swa.success('Producto Agregado', '');
        }
      }
    });
  }

}