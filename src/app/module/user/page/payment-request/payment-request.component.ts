import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentRequests } from 'src/app/module/contracts/payment-requests';
import { PaymentTransferDetailResponse } from 'src/app/module/contracts/payment-transfer-detail';
import { PaymentVerificationDetail } from 'src/app/module/contracts/payment-verification-detail';
import { HttpService } from 'src/app/service/common/http.service';
import { PaymentModalComponent } from '../../modal/payment-modal/payment-modal.component';
import { PaymentVerifyModalComponent } from '../../modal/payment-verify-modal/payment-verify-modal.component';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {

  constructor(private http: HttpService, public dialog: MatDialog) { }

  paymentRequests: PaymentRequests[] = [];
  transferDetail: PaymentTransferDetailResponse;
  paymentVerificationDetail: PaymentVerificationDetail;

  ngOnInit(): void {

    this.loadData();

  }

  private loadData() {
    this.http.post<PaymentRequests[]>("PaymentInfo/GetPaymentRequests", null).subscribe(res => {

      this.paymentRequests = res;
    })
  }

  onPayNow(orderDetailNo, paymentRequestNo) {
    this.http.get<PaymentTransferDetailResponse>(`PaymentInfo/GetPaymentTransferDetail?OrderDetailNo=${orderDetailNo}&paymentRequestNo=${paymentRequestNo}`).subscribe(res => {
      this.transferDetail = res;
      this.transferDetail.PaymentRequestNo = paymentRequestNo;

      const dialogRef = this.dialog.open(PaymentModalComponent, {
        minWidth: "90%",
        data: res
      });

      dialogRef.afterClosed().subscribe((data) => {
        this.loadData();

      })
    })

  }

  onApprove(paymentRequestNo) {

    this.http.get<PaymentVerificationDetail>("PaymentInfo/GetPaymentVerificationDetail?paymentRequestNo=" + paymentRequestNo).subscribe(res => {
      this.paymentVerificationDetail = res;
      const dialogRef = this.dialog.open(PaymentVerifyModalComponent, {
        minWidth: "90%",
        data: res
      });

      dialogRef.afterClosed().subscribe((data) => {

        this.loadData();


      })
    })
  }

}
