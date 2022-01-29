import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { PaymentVerificationDetail } from 'src/app/module/contracts/payment-verification-detail';
import { HttpService } from 'src/app/service/common/http.service';
import {environment} from '../../../../../environments/environment'

@Component({
  selector: 'app-payment-verify-modal',
  templateUrl: './payment-verify-modal.component.html',
  styleUrls: ['./payment-verify-modal.component.css']
})
export class PaymentVerifyModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaymentVerificationDetail,private http: HttpService, private matDialoge: MatDialogRef<PaymentVerifyModalComponent>, private toastr: ToastrService ) {

    this.downloadName = "Receipt"+ data.ReceiptPath.split('.')[0];
    this.serverURL = environment.serverURL;
  }
  serverURL:string

  form = new FormGroup({
    agree: new FormControl(null,Validators.required),
    agree2: new FormControl(null,Validators.required),
  })

  enableVerifyButton = true;

  downloadName:string;

  ngOnInit(): void {
  }

  onPaymentReceived(){

    this.enableVerifyButton= false;
    this.http.post<OKResponse>("PaymentInfo/PaymentReceivedStatusUpdate?paymentRequestNo="+this.data.PaymentRequestNo,null).subscribe(res=>{

      if(res.IsSuccess){
        this.toastr.success("",res.Message);
        this.matDialoge.close(true);
      }
      this.enableVerifyButton= true;
    })

  }

}
