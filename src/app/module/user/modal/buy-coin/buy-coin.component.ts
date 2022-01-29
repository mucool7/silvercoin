import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BuyCoinRequest } from 'src/app/module/contracts/buy-coin-request';
import { MasterDataResponse } from 'src/app/module/contracts/master-data-response';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { HttpService } from 'src/app/service/common/http.service';

@Component({
  selector: 'app-buy-coin',
  templateUrl: './buy-coin.component.html',
  styleUrls: ['./buy-coin.component.css']
})
export class BuyCoinComponent implements OnInit {

  constructor(private http:HttpService,private matDialoge:MatDialogRef<BuyCoinComponent>,private toastr: ToastrService) { }
  coinValue =5000;
  TotalCoin:string ;
  selectedAmount = null;
  CoinSellRange:MasterDataResponse[]=[];
  ProductNo=2;

  ngOnInit(): void {

    this.http.get<MasterDataResponse[]>("CoinTransact/GetSellRange").subscribe(res=>{
        this.CoinSellRange = res;
    })



  }

  onBuyCoin(){

    const request:BuyCoinRequest={
      ProductNo:this.ProductNo,
      Quantity:Number(this.TotalCoin)
    }
    this.http.post<OKResponse>("CoinTransact/BuyCoin",request).subscribe(res=>{
      if(res.IsSuccess){
    this.toastr.success("Coin Purchased","Done")
        this.matDialoge.close(true);
      }
    })

  }

  onAmountSelect(amount){


    this.TotalCoin = amount.target.value;
    // this.selectedAmount = parseInt(this.selectedAmount);
    // this.TotalCoin =  (this.selectedAmount/this.coinValue).toFixed(3);


  }

}
