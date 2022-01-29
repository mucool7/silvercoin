import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mohar';

  constructor(){
   this.detectDevice();
  }
  isMobile=true;

  detectDevice(){

    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
     {

      this.isMobile=true;
     }
    else
      {
        this.isMobile= false;
      }
  }
}
