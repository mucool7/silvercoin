import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { ResgistrationRequest } from 'src/app/module/contracts/resgistration-request';
import { HttpService } from 'src/app/service/common/http.service';
import { PasswordMatch, PhoneNoValidator } from "../../../../Validators/phoneno.validator";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http:HttpService,private router:Router) { }

  form:string ="form1"
  private formStack:any[] =[this.form];
  form1=new FormGroup({
    name: new FormControl(null,Validators.required),
    email: new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null,[Validators.required,PhoneNoValidator]),
    password: new FormControl(null,[Validators.required]),
    rePassword: new FormControl(null,[Validators.required])
    // dob: new FormControl(null,[Validators.required]),
  },{
    validators:[PasswordMatch('password','rePassword')]
  })

  form2= new FormGroup({
    email: new FormControl(null,[Validators.required]),
    // aadharNo: new FormControl(null,[Validators.required]),
    // panno: new FormControl(null,[Validators.required])
  })

  form3 = new FormGroup({
    phone: new FormControl(null,[Validators.required]),
    // password: new FormControl(null,[Validators.required]),
    // rePassword: new FormControl(null,[Validators.required])
  })
  passwordForm = new FormGroup({
    password: new FormControl(null,[Validators.required]),
    rePassword: new FormControl(null,[Validators.required])
  })

  acknoForm = new FormGroup({
    acknowledge: new FormControl(null,[Validators.required]),
  })


  resgistrationRequest:ResgistrationRequest;
  phoneError:string = null;
  emailError:string = null;

  ngOnInit(): void {
  }

  setForm(form){
    this.form = form;
    this.formStack.push(form);
  }

  submitForm1(data){
    console.log(this.form1.value)
    // this.setForm('emailForm')
    this.emailError=null;
    this.phoneError=null;
    forkJoin({
      email:this.http.get<OKResponse>("registration/validateEmail?email="+this.form1.value.email),
      phone:this.http.get<OKResponse>("registration/validatePhone?phone="+this.form1.value.phone)
    }).subscribe(response=>{

      if(!response.email.IsSuccess){
        this.emailError = response.email.Message;
      }

      if(!response.phone.IsSuccess){
        this.phoneError=response.phone.Message;
      }

      if(this.emailError || this.phoneError){return;}

      this.resgistrationRequest={
        Email:this.form1.value.email,
        FullName:this.form1.value.name,
        Password:this.form1.value.password,
        PhoneNo:this.form1.value.phone.toString(),
        PhoneVerificationNo:0,
        EmailVerificationNo:0
      }
      this.setForm('complete')


    })
  }

  setEmail(event){
    console.log(this.form2.value);
    this.setForm('phoneForm')
  }

  setPhone(event){

    this.setForm('passwod')

  }
  setPassword(event){

    // this.resgistrationRequest={
    //   Email : this.form2.value.email.value,
    //   EmailVerificationNo : this.form2.value.email.verificationNo,
    //   FullName: this.form1.value.name,
    //   Password: this.passwordForm.value.password,
    //   PhoneNo:this.form3.value.phone.value,
    //   PhoneVerificationNo:this.form3.value.phone.verificationNo
    // }

    // this.resgistrationRequest={
    //   Email:this.form1.value.email,
    //   FullName:this.form1.value.name,
    //   Password:this.form1.value.password,
    //   PhoneNo:this.form1.value.PhoneNo,
    //   PhoneVerificationNo:0,
    //   EmailVerificationNo:0
    // }
    this.setForm('complete')

  }

  completeRegistration(event){

    let url ="Registration/RegisterNew";

    this.http.post<any>(url,this.resgistrationRequest).subscribe(res=>{

      if(res.RegistrationNo){

        this.router.navigate(['login'])
      }
      console.log(res)
    },error=>alert("Something went wrong. Please try again later.")
    )

  }

  back(){
    this.formStack.pop();
    this.form = this.formStack[this.formStack.length-1]
    console.log(this.formStack)

  }

}
