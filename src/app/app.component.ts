import { Component, OnInit } from '@angular/core';

import { SessionService } from './services/session.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loggedIn: boolean = false;
  public loginFlag: boolean = false;

  public name: string = '';
  public profile: string = '';

  constructor(private sessionService: SessionService) {}

  ngOnInit(){
    this.sessionService.isLoggedIn
      .subscribe((result) => {
        this.loggedIn = result;
        if(this.loggedIn){
          this.name = sessionStorage.getItem('name');
          this.profile = sessionStorage.getItem('profile');
          
          setTimeout(() => {
            //this.initSidebar();
          }, 10);
        }
      });
    
    this.sessionService.loginState
      .subscribe((result) => {
        this.loginFlag = result;
        if(this.loginFlag){
          
        }
      });
  }

  initSidebar(){
    $('#minimizeSidebar').on('click', () => {
      $('body').toggleClass('sidebar-mini');
    });
  }

}