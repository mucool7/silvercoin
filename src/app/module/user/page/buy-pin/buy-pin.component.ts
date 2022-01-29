import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { PaymentVerifyRequest } from 'src/app/module/contracts/payment-verify-request';
import { PreOrderDetailRequest } from 'src/app/module/contracts/pre-order-detail-request';
import { HttpService } from 'src/app/service/common/http.service';
import { LocalStateService } from 'src/app/service/common/local-state.service';
declare var Razorpay;
@Component({
  selector: 'app-buy-pin',
  templateUrl: './buy-pin.component.html',
  styleUrls: ['./buy-pin.component.css']
})
export class BuyPinComponent implements OnInit {

  constructor(private router: Router, private stateService: LocalStateService, private http: HttpService,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.paymentError ="Payment Success"
  }

  pinForm = new FormGroup({
    pin: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)])
  })
  paymentError:string = null;
  paymentSuccess:string = null;
  showBuyButton=true;
  disableButton=false;

  pinError:string=null;
  pinSuccess:string=null;
  showPinButton=true;
  disablePinButton=false;

  addPin() {

    let request={
      PIN:this.pinForm.value.pin
    }
    this.disablePinButton=true;
    this.pinError=null;
    this.pinSuccess=null;
    this.http.post<OKResponse>("AccountActivation/AddPIN", request).subscribe(response=>{

      if (response.IsSuccess) {
        this.stateService.setLocalStateObj('KUID',response.Data)
        this.pinSuccess = response.Message;
        setTimeout(() => {
        this.router.navigateByUrl('app/home');
        }, 4000);

        this.showPinButton=false;
        this.cdr.detectChanges();
      }
      else{
        this.disablePinButton=false;
        this.pinError = response.Message;
      }

  },error=>{
    this.disablePinButton=false;
    this.pinError = "Something went wrong please try again later."})
}

  buyNow() {

    this.paymentSuccess=null;
    this.paymentError=null;
    this.disableButton=true;

    this.http.post<PreOrderDetailRequest>("checkout/generateOrder", {}).subscribe(preOrderDetail => {

      preOrderDetail.handler = (response) => {
        console.log(response);
        let request: PaymentVerifyRequest = {
          ReceiptID: preOrderDetail.order_reciept,
          RZPAY_PaymentID: response.razorpay_payment_id,
          RZPAY_OrderID: response.razorpay_order_id,
          RZPAY_Signature: response.razorpay_signature
        }
        this.http.post<OKResponse>("checkout/VerifySignature", request).subscribe(resp => {

          if (resp.IsSuccess) {
            this.stateService.setLocalStateObj('KUID',resp.Data)
            this.paymentSuccess = resp.Message;
            setTimeout(() => {
            this.router.navigateByUrl('app/home');
            }, 5000);

            this.showBuyButton=false;
            this.cdr.detectChanges();
            return;
          }
          this.paymentError = resp.Message;
          this.disableButton=false;
          this.cdr.detectChanges();

        },error=>{
          this.paymentError = error.Message;
          this.disableButton=true;
          this.cdr.detectChanges();

        })
      }
      let rzpay = new Razorpay(preOrderDetail);
      rzpay.on("payment.failed", (response) => {
        this.paymentError = "Error";
        this.cdr.detectChanges();

      })
      rzpay.open();


    })
  }

}
