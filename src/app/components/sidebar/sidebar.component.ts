import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() name: string;
  @Input() profile: string;
  @Input() loggedIn: boolean;

  public routes: Array<any> = this.routes = [
    {
      name: 'EMPLEADOS',
      icon: 'fa fa-users',
      route: ['configuration', 'users-list'],
      children: [ ],
      loggedIn: true
    },
    {
      name: 'PRODUCTOS',
      icon: 'fas fa-box-open',
      route: ['configuration', 'products-list'],
      children: [ ],
      loggedIn: true
    },
    {
      name: 'PEDIDOS',
      icon: 'fas fa-clipboard-list',
      route: ['configuration', 'orders'],
      children: [ ],
      loggedIn: true
    },
    {
      name: 'LISTADO DE PRODUCTOS',
      icon: 'fa fa-boxes',
      route: ['configuration', 'home-list'],
      children: [ ],
      loggedIn: false
    },
    {
      name: 'CARRITO DE COMPRAS',
      icon: 'fa fa-shopping-cart',
      route: ['configuration', 'shopping-cart'],
      children: [ ],
      loggedIn: false
    }
  ];

  public profiles: Array<any> = [
    {
      id: 1,
      name: 'Administrador'
    },
    {
      id: 2,
      name: 'Vendedor'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.profile == '2'){
      this.routes.splice(0, 1);
    }
  }

  goToModule(route){
    if(route && route.length > 0)
      this.router.navigate(route);
  }

}
