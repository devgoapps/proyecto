import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public comments: Array<any> = [];
  public numberOfFlips: number = 0;
  public flip: number = 0;
  public codeIndex: number = 0;

  constructor(private swa: SweetAlertService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(){
    this.swa.loading('Obteniendo comentarios.');

    let comments = localStorage.getItem('comments');
    if(comments){
      this.comments = JSON.parse(comments);
    }
    this.swa.close();
  }

  generateRandom(){
    this.numberOfFlips = Math.floor(Math.random() * 100);

    this.putIndex(0, this.comments.length);
  }

  putIndex(i, items){
    if(i < items && this.flip < this.numberOfFlips){
      setTimeout(() => {
        this.codeIndex = i;
        this.flip++;
        i++;
        this.putIndex(i, items);
      }, 100);
    }else if(this.flip < this.numberOfFlips){
      setTimeout(() => {
        i = 0;
        this.codeIndex = i;
        this.flip++;
        i++;
        this.putIndex(i, items);
      }, 100);
    }else{
      return false;
    }
  }
  

}