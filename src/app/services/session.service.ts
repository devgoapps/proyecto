import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  public loginFlag = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  get isLoggedIn() {
    let loggedIn = sessionStorage.getItem('loggedIn') == 'true' ? true: false;
    this.loggedIn.next(loggedIn);
    return this.loggedIn.asObservable();
  }

  get loginState() {
    let loginFlag = sessionStorage.getItem('loginFlag') == 'true' ? true: false;
    this.loginFlag.next(loginFlag);
    return this.loginFlag.asObservable();
  }

  enterLogin(){
    sessionStorage.setItem('loginFlag', 'true');
    
    this.loginFlag.next(true);
  }

  leaveLogin(){
    sessionStorage.setItem('loginFlag', 'false');
    
    this.loginFlag.next(false);
  }

  login(user){
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('profile', user.profile);
    
    this.loggedIn.next(true);
  }

  logout(){
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('profile');

    this.loggedIn.next(false);
  }
}
