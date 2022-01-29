import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDetail } from 'src/app/module/contracts/account-detail';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { HttpService } from 'src/app/service/common/http.service';
import { LocalStateService } from 'src/app/service/common/local-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http:HttpService,private stateService:LocalStateService) { }

  accountDetail:AccountDetail;
  login:LoginResponse;
  ngOnInit(): void {

     this.login = this.stateService.getLocalStateObj<LoginResponse>('KUID');
    this.http.get<AccountDetail>("AccountActivation/GetAccountDetail?LoginNo="+this.login.LoginNo).subscribe(response=>{
      this.accountDetail = response;
      this.accountDetail.KYCDetail
    })
  }

}
