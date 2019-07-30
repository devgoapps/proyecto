import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../../services/session.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials: any = { }
  
  public textPattern: any = /^[a-z\s0-9Ññ.]+$/i;
  
  constructor(private router: Router,
              private swa: SweetAlertService,
              private sessionService: SessionService) { }

  ngOnInit() {
    //this.httpService.setModule('user');
    this.sessionService.enterLogin();
  }

  ngOnDestroy(){
    this.sessionService.leaveLogin();
  }

  goBack(){
    this.router.navigate(['configuration', 'home-list']);
  }

  login(){
    let exist = false;
    let users: any = localStorage.getItem('users');
    if(users){
      users = JSON.parse(users);
      for(let i = 0; i < users.length; i++){
        if(this.credentials.email == users[i].email){
          if(this.credentials.password == users[i].password){
            exist = true;
            this.sessionService.login(users[i]);
            this.router.navigate(['configuration', 'products-list']);
          } 
        }
      }
      if(!exist)
        this.swa.info('El usuario no fue encontrado.', '');
    }else{
      this.swa.info('El usuario no fue encontrado.', '');
    }  
  }
}
