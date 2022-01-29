import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaymentTransferDetailResponse } from 'src/app/module/contracts/payment-transfer-detail';
import { HttpService } from 'src/app/service/common/http.service';
import { BuyCoinComponent } from '../buy-coin/buy-coin.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { PaymentSentReq } from 'src/app/module/contracts/payment-sent-req';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {


  constructor(private http: HttpService, @Inject(MAT_DIALOG_DATA) public data: PaymentTransferDetailResponse, private matDialoge: MatDialogRef<BuyCoinComponent>, private toastr: ToastrService) { }
  transferDetail: PaymentTransferDetailResponse;
  ngOnInit(): void {

    this.transferDetail = this.data;
    // this.http.get<PaymentTransferDetailResponse>("PaymentInfo/GetPaymentTransferDetail").subscribe(res=>{
    //   this.transferDetail = res;
    // })
  }

  paymentForm = new FormGroup({
    PaidTo: new FormControl(null, Validators.required),
    Reciept: new FormControl(null, Validators.required),
  })

  file: File;
  isReceiptUploaded = false;
  enablePayNowButton=true

  receiptPath: string = null;

  onRecieptSelect(event) {

    this.isReceiptUploaded = false;
    this.receiptPath = null;
    this.file = event.target.files[0];
    this.onUpload()
  }

  private onUpload() {
    console.log(this.file);
    let data = [{
      name: "PaymentRequestNo",
      value: this.transferDetail.PaymentRequestNo
    }]
    this.http.upload<OKResponse>("FileUpload/UploadImage", this.file, data).subscribe(
      res => {
        if (res.IsSuccess) {
          this.toastr.success("",res.Message);
          this.isReceiptUploaded = true;
          this.receiptPath = res.Data.path;
        }
      }
    );
  }

  onPaymentDone() {

    var isBank = this.paymentForm.get('PaidTo').value === 0;

    this.enablePayNowButton =false;
    let paymentSentReq: PaymentSentReq = {
      BankDetailNo: isBank ?  this.transferDetail.BankDetail.BankDetailNo:null,
      UPIDetailNo: isBank ? null:this.transferDetail.UPIDetail.UpidetailNo ,
      PaymentRequestNo: this.transferDetail.PaymentRequestNo,
      ReceiptPath: this.receiptPath
    }

    this.http.post<OKResponse>("PaymentInfo/PaymentSentStatusUpdate",paymentSentReq).subscribe(res=>{
      if (res.IsSuccess) {
        this.toastr.success(res.Data.msg,res.Message);
        this.matDialoge.close(true)
      }

      this.enablePayNowButton = true;

    })

  }

  //upload
}
