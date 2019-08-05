import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var $: any;

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

  public comment: any = {};

  public textPattern: any = /^[a-zA-Z\sÑñ]+$/i;
  public codePattern: any = /^[A-Z]+$/i;

  constructor(private router: Router,
              private swa: SweetAlertService,
              private sessionService: SessionService) { }

  ngOnInit() { 

  }

  showCommentForm(){
    $('form')[0].reset();
    $('#commentForm').modal('show');
  }

  createComment(){
    let comments: any = localStorage.getItem('comments');
    if(comments){
      comments = JSON.parse(comments);
    }else{
      comments = [];
    }

    comments.push(this.comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    this.swa.success('Comentario creada', '', () => { 
      $('#commentForm').modal('hide');
    });
  }

  goLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    this.sessionService.logout();
    this.router.navigate(['configuration', 'home-list']);
  }

}
