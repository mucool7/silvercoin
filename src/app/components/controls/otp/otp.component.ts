import { Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { OTPValidationRequest } from 'src/app/module/contracts/otpvalidation-request';
import { HttpService } from 'src/app/service/common/http.service';
import { OTPRequest } from "../../../module/contracts/otprequest";
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OTPComponent),
            multi: true
    }
    ]
})
export class OTPComponent implements OnInit, ControlValueAccessor {



  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChange: any = () => {}
onTouch: any = () => {}
val= null; // this is the updated value that the class accesses
set value(val){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
this.val = val
this.onChange(val)
this.onTouch(val);

if(val?.value){
this._form.get('inputField').disable();

}


}
// this method sets the value programmatically
writeValue(value: any){
this.value = value
if(value)
this._form.get('inputField').setValue(value.value)

}
// upon UI element value changes, this method gets triggered
registerOnChange(fn: any){
this.onChange = fn
}
// upon touching the element, this method gets triggered
registerOnTouched(fn: any){
this.onTouch = fn
}


  @Input("lable") lable = null;
  @Input("placeholder") placeholder = null;
  @Input("OTPUrl") OTPUrl = null;
  @Input("VerifyOTPUrl") VerifyOTPUrl = 'OTPService/ValidateOTP';
  @Input("isPhone") isPhone = false;

  @ViewChild('form1') inputForm;
  @ViewChild('otpForm') otpForm;

   emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  isOTPCallStarted = false;
  errorMsg:string =null;
  otpValidationRequest:OTPValidationRequest={
    OTP:null,
    OTPAgaints:null,
    OTPDetailNo:null

  }

  _form = new FormGroup({
    inputField : new FormControl(null,[Validators.required])
  }) ;
  _otpForm = new FormGroup({
    otp : new FormControl(null,Validators.required)
  })

  inputField:string = null;
  otpField:string = null;
  disableInputField =false;


  constructor(private _http:HttpService) { }

  ngOnInit(): void {
    this._form.get('inputField').enable();


  }

  triggerOnSendOTP(){

    this.errorMsg = null;

    if(!this.inputField){return this.errorMsg ="Please enter "+this.lable+"."};
    if(this.isPhone && this.inputField.length != 10){return this.errorMsg="Phone Number must have 10 digits."};
    if(!this.isPhone && !this.emailPattern.test(this.inputField)){return this.errorMsg="Invalid EmailID."};

    this.onSendOTP();
  }

  onSendOTP(){

    let otpRequest:OTPRequest={
      Email: this.isPhone?null:this.inputField,
      PhoneNo: !this.isPhone?null:this.inputField,
    }

    this.disableInputField = true;
    this.errorMsg =null;
    this._http.post(this.OTPUrl,otpRequest).subscribe((res:any)=>{

       if(res.error){
        this.errorMsg =res.Message
        this.disableInputField = false;

        return;
      }
      this.isOTPCallStarted = true;
      this.otpValidationRequest.OTPAgaints= res.OTPAgainst;
      this.otpValidationRequest.OTPDetailNo= res.OTPDetailNo;

    },error=>{
      this._form.get('inputField').enable();
      this.disableInputField = false;
      this.errorMsg = error.Message
    })


  }


  triggerOnValidateOTP(){

    this.errorMsg = null;


    if(!this.otpField){return this.errorMsg ="Please enter 6 Digit OTP."};
    if( this.otpField.toString().length != 6){return this.errorMsg="Invalid OTP. Enter 6 Digit OTP."};

    this.onValidateOTP();
  }

  onValidateOTP(){

    this.otpValidationRequest.OTP = this.otpField.toString();

    this.errorMsg = null;
    this._http.post(this.VerifyOTPUrl,this.otpValidationRequest).subscribe((res:any)=>{
      if(!res.IsValid){
        this.errorMsg ="Invalid OTP. Please try again"
        this.otpField = null;
        this.value= null;
        return;
      }
      else if(res.Error){
        this.errorMsg =res.Message
        this.otpField = null;
        this.value= null;
        return;
      }

      this.value = {
        verificationNo:res.OTPDetailNo,
        value:this.inputField
      }

    })


  }

}
