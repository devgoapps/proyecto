import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() name: string;
  @Input() profile: string;
  @Input() loggedIn: boolean;

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

  constructor(private router: Router,
              private sessionService: SessionService) { }

  ngOnInit() { 

  }

  goLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    this.sessionService.logout();
    this.router.navigate(['configuration', 'home-list']);
  }

}
