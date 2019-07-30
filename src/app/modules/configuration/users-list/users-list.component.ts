import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';

declare var $: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public user: any = { };
  public users: Array<any> = [];
  public userIndex: number = 0;

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

  public method: string = 'create';
  public inputType: string = 'password';

  public textPattern: any = /^[a-zA-Z\sÑñ]+$/i;
  public emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

  constructor(private swa: SweetAlertService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.swa.loading('Obteniendo usuarios.');

    let users = localStorage.getItem('users');
    if(users){
      this.users = JSON.parse(users);
    }
    this.swa.close();
  }

  getUserById(index){
    $('form')[0].reset();
    this.swa.loading('Obteniendo detalle del usuario.');
    let user = Object.assign({}, this.users[index]);
    this.userIndex = index;

    if(user){
      this.swa.close();
      setTimeout(() => {
        this.user = Object.assign({}, user);
        
        this.method = 'update';
        this.showUserForm();
      }, 0);
    }else{
      this.swa.close();
    }
  }

  newUser(){
    $('form')[0].reset();
    this.user = { };
    this.showUserForm();
    this.method = 'create';
  }

  showUserForm(){
    $('#userForm').modal('show');
  }

  createUser(){
    if(this.user){
      this.users.push(this.user);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.swa.success('Usuario creado', '', () => {
        $('#userForm').modal('hide');
        this.getUsers();
      });
    }
  }

  updateUser(){
    if(this.user){
      this.users[this.userIndex] = this.user; 
      localStorage.setItem('users', JSON.stringify(this.users));
      this.swa.success('Usuario actualizado', '', () => {
        $('#userForm').modal('hide');
        this.getUsers();
      });
    }
  }

}