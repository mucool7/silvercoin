import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AccountDetail, BankDetail, UPIDetail } from 'src/app/module/contracts/account-detail';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { HttpService } from 'src/app/service/common/http.service';
import { LocalStateService } from 'src/app/service/common/local-state.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

  constructor(private http:HttpService,private stateService:LocalStateService,private router:Router,private snapshot:ActivatedRoute) { }

  panForm = new FormGroup({
    PANNo: new FormControl(null,[Validators.required]),
    errorMsg:new FormControl(""),
    successMsg:new FormControl("")
  })

  upiForm = new FormGroup({
    UPIAddress:new FormControl(null,[Validators.required]),
    UPIType:new FormControl(null,[Validators.required]),
    errorMsg:new FormControl(""),
    successMsg:new FormControl("")
  })

  bankForm  = new FormGroup({
    BankName : new FormControl(null,[Validators.required]),
    IFSCCode : new FormControl(null,[Validators.required]),
    AccountNumber : new FormControl(null,[Validators.required]),
    Name : new FormControl(null,[Validators.required]),
    errorMsg:new FormControl(""),
    successMsg:new FormControl("")
  })

  accountDetails:AccountDetail;
  disableAddPANButton=false;
  showPANButton =true;

  showUPIButton=true;
  disableUPIButton=false;

  showBankButton=true;
  disableBankButton=false;

  showNextButton=false;

  isAccountDetailPage=true;

  ngOnInit(): void {


    this.getKYCDetail(()=>{

      this.snapshot.data.subscribe(query=>{
        this.isAccountDetailPage = !!query.home
        if(this.showNextButton && !query.home){
          this.onNext();
        }
        let login = this.stateService.getLocalStateObj<LoginResponse>('KUID');
        this.http.get<AccountDetail>("AccountActivation/GetAccountDetail?LoginNo="+login.LoginNo).subscribe(response=>{
          console.log(response)
          this.accountDetails = response;
          this.accountDetails.KYCDetail
          this.setFormValues();
        })
      })

    })

  }

  setFormValues(){
    if(this.accountDetails.KYCDetail.Panno){
    this.panForm.get('PANNo').setValue(this.accountDetails.KYCDetail.Panno);
    this.panForm.get('PANNo').disable();

    this.showPANButton =false;
    }

    if(this.accountDetails?.UPIDetail){
      this.upiForm.disable();
      this.upiForm.get('UPIAddress').setValue(this.accountDetails.UPIDetail.Upiid);
      this.upiForm.get('UPIType').setValue(this.accountDetails.UPIDetail.UpitypeNo);
      this.showUPIButton=false;
    }

    if(this.accountDetails.BankDetails.length>0){
      this.bankForm.disable();
      this.bankForm.setValue({
        BankName : this.accountDetails.BankDetails[0].BankName,
        IFSCCode : this.accountDetails.BankDetails[0].Ifccode,
        AccountNumber :this.accountDetails.BankDetails[0].AccountNumber,
        Name : this.accountDetails.BankDetails[0].AccountHolderName,
        errorMsg:"",
        successMsg:""
    })
    this.showBankButton=false;
  }
  }

  addPAN(){


    this.disableAddPANButton=true;
    this.panForm.get('successMsg').reset();
    this.panForm.get('errorMsg').reset();
    this.http.get<OKResponse>("AccountActivation/AddPANDetail?PANNo="+this.panForm.value.PANNo).subscribe(respose=>{
       if(respose.IsSuccess){

        this.panForm.get('PANNo').disable();
        this.panForm.get('successMsg').setValue(respose.Message);
        this.panForm.get('errorMsg').reset();
        this.showPANButton =false;

        this.getKYCDetail(null);
       }
       let res:any = respose;

       if(res.Error){
        this.panForm.get('PANNo').enable();
        this.panForm.get('errorMsg').setValue(res.Message);
        this.panForm.get('successMsg').reset();
        this.showPANButton =true;
        this.disableAddPANButton=false;


       }

    })
  }

  addUPI(){

    let upiDetail:UPIDetail={
      RegistrationNo:0,
      UpidetailNo:0,
      Upiid:this.upiForm.value.UPIAddress,
      UpitypeNo:this.upiForm.value.UPIType,
      Verified:true
    }

    this.disableUPIButton=true;
    this.upiForm.get('successMsg').reset();
    this.upiForm.get('errorMsg').reset();
    this.http.post<OKResponse>("AccountActivation/AddUPIDetail",upiDetail).subscribe(response=>{

      if(response.IsSuccess){

        this.upiForm.disable();
        this.upiForm.get('successMsg').setValue(response.Message);
        this.upiForm.get('errorMsg').reset();
        this.showUPIButton =false;
        this.getKYCDetail(null);


       }
       let res:any = response;

       if(res.Error){
      this.setErrorOnUPIForm(res.Message)

       }

    },error=>{
      this.setErrorOnUPIForm("Something went wrong. please try again later.")
    })


  }

  addBank(){

    let bankDetail:BankDetail={
      AccountHolderName:this.bankForm.value.Name,
      RegistrationNo:0,
      AccountNumber :this.bankForm.value.AccountNumber.toString(),
      BankName:this.bankForm.value.BankName,
      Ifccode:this.bankForm.value.IFSCCode,
      BankDetailNo:0,

    }

    this.disableBankButton=true;
    this.bankForm.get('successMsg').reset();
    this.bankForm.get('errorMsg').reset();
    this.http.post<OKResponse>("AccountActivation/AddBankDetail",bankDetail).subscribe(response=>{
      if(response.IsSuccess){

        this.bankForm.disable();
        this.bankForm.get('successMsg').setValue(response.Message);
        this.bankForm.get('errorMsg').reset();
        this.showBankButton =false;
        this.getKYCDetail(null);

       }
       let res:any = response;

       if(res.Error){
      this.setErrorOnBankForm(res.Message)

       }

    },error=>{
      this.setErrorOnBankForm("Something went wrong. please try again later.")
    })


  }

  setErrorOnBankForm(message){
    this.bankForm.enable();
    this.bankForm.get('errorMsg').setValue(message);
    this.bankForm.get('successMsg').reset();
    this.showBankButton =true;
    this.disableBankButton=false;
  }

  setErrorOnUPIForm(message){
    this.upiForm.enable();
    this.upiForm.get('errorMsg').setValue(message);
    this.upiForm.get('successMsg').reset();
    this.showUPIButton =true;
    this.disableUPIButton=false;
  }

  getKYCDetail(cb){

    this.http.get<OKResponse>("AccountActivation/KYCDetail").subscribe(response=>{

      console.log(response);
      if(response.IsSuccess){
        this.showNextButton=true;
      }
      if(cb){
        cb();
      }

    },error=>{

    })
  }

  onNext(){
    this.router.navigateByUrl('app/pin')
  }

}
