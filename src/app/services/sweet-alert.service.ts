import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  success(title = '', text = '', callback?){
    Swal.close();
    let options: any = { 
      title: title, 
      text: text, 
      type: 'success',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      onBeforeOpen: function closeLoading() {
        Swal.hideLoading();
      }
    };
    if(callback){
      Swal.fire(options).then((result) => {
        callback(result);
      });
    }else{
      Swal.fire(options);
    }
  }

  error(title = '', text = ''){
    Swal.close();
    Swal.fire({ 
      title: title, 
      text: text, 
      type: 'error', 
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      onBeforeOpen: function closeLoading() {
        Swal.hideLoading();
      }
    });
  }
  
  loading(title = '', text = '') {
    Swal.close();
    let options: any = {
      title : title,
      text: text,
      allowOutsideClick : false,
      allowEscapeKey : false,
      onOpen: function(){
          Swal.showLoading();
      }
    };
    Swal.fire(options);
  }

  info(title = '', text = '') {
    Swal.close();
    Swal.fire({ 
      title: title, 
      text: text, 
      type: 'warning', 
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      onBeforeOpen: function closeLoading() {
        Swal.hideLoading();
      }
    });
  }

  confirm(title = '', text = '', callbackConfirm?) {
    Swal.close();
    let options: any = {
      type: 'warning',
      title : title,
      text : text,
      allowOutsideClick : false,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowEscapeKey : true,
      reverseButtons: true
    };

    Swal.fire(options).then(function (result){
      if (result.value)
        callbackConfirm(result);
      else
        callbackConfirm({ value: false });
    });
  }

  close() {
    Swal.close();
  }
}
