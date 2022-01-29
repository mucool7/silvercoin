import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { LocalStateService } from 'src/app/service/common/local-state.service';

@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrls: ['./user-side-nav.component.css']
})
export class UserSideNavComponent implements OnInit {

  constructor(private _userSideNavService:UserSideNavService,private stateService:LocalStateService,private router:Router) { }

  activate=false;
  username:string;
  activatePannel=false;
  email:string;
  isKYC:boolean=false

  ngOnInit(): void {
    this._userSideNavService.$menuToogle.subscribe((data)=>{
     this.menuClick();

    })
    let loginDetail = this.stateService.getLocalStateObj<LoginResponse>('KUID');
    this.username = loginDetail.Name;
    this.email = loginDetail.Email;
    this.isKYC = loginDetail.KYCVerified;
  }

  menuClick(){
    if(this.activate){
      this.activatePannel=!this.activatePannel;
      setTimeout(() => {
      this.activate = !this.activate;

      }, 400);
    }
    else{
      console.log('sd')
      this.activate = !this.activate;
      setTimeout(()=>{
        this.activatePannel=!this.activatePannel;
      },100)
    }
  }

  logout(){

    this.stateService.setLocalStateObj('KUID',null);

    this.router.navigateByUrl('login')
  }

}

@Injectable({
  providedIn:'root'
})
export class UserSideNavService{

  $menuToogle = new Subject();

  constructor(private stateService:LocalStateService,private router:Router) {

  }

  toggleMenu(){

    this.$menuToogle.next(null);
  }


}
