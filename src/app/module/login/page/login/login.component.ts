import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { HttpService } from 'src/app/service/common/http.service';
import { LocalStateService } from 'src/app/service/common/local-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private http:HttpService,private stateService:LocalStateService) { }

  ngOnInit(): void {
  }
  errorMsg:string=null;

  loginForm = new FormGroup({
    userName:new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required])
  })


  onLogin(){

    let url = `authentication/login?username=${this.loginForm.value.userName}&password=${this.loginForm.value.password}`

    console.log(url)
   // alert()
    this.http.get<LoginResponse>(url).subscribe(res=>{
      if(res.LoginNo){
        this.stateService.setLocalStateObj('KUID',res);
        this.router.navigateByUrl('app/home')
        return;
      }

      let response:any = res;
      if(response.Error){
          this.errorMsg = response.Message;
      }


    },error=>this.errorMsg="Something Went Wrong. Please try again later.")

  }
}
