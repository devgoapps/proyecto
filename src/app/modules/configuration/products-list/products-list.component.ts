import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';

declare var $: any;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public product: any = { default: 'assets/img/default-product.png' };
  public products: Array<any> = [];
  public productIndex: number = 0;

  public method: string = 'create';
  public inputType: string = 'password';

  public textPattern: any = /^[a-zA-Z0-9\sÑñ]+$/i;
  public emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

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

  getProductById(index){
    $('form')[0].reset();
    this.swa.loading('Obteniendo detalle del usuario.');
    let product = Object.assign({}, this.products[index]);
    this.productIndex = index;

    if(product){
      this.swa.close();
      setTimeout(() => {
        this.product = Object.assign({}, product);
        
        this.method = 'update';
        this.showProductForm();
      }, 0);
    }else{
      this.swa.close();
    }
  }

  newProduct(){
    $('form')[0].reset();
    this.product = { default: 'assets/img/default-product.png' };
    this.showProductForm();
    this.method = 'create';
  }

  showProductForm(){
    $('#productForm').modal('show');
  }

  createProduct(){
    if(this.product){
      this.products.push(this.product);
      localStorage.setItem('products', JSON.stringify(this.products));
      this.swa.success('Producto creado', '', () => {
        $('#productForm').modal('hide');
        this.getProducts();
      });
    }
  }

  updateProduct(){
    if(this.product){
      this.products[this.productIndex] = this.product; 
      localStorage.setItem('products', JSON.stringify(this.products));
      this.swa.success('Producto actualizado', '', () => {
        $('#productForm').modal('hide');
        this.getProducts();
      });
    }
  }

  uploadMedia(event){
    let target = event.target || event.srcElement;
    if (target.files && target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          this.product.image = fileReader.result;
        };
        fileReader.readAsDataURL(target.files[0]);
    }
  }

}