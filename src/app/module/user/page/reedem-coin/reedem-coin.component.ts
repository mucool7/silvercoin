import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoinReedemDetail } from 'src/app/module/contracts/coin-reedem-detail';
import { OKResponse } from 'src/app/module/contracts/okresponse';
import { HttpService } from 'src/app/service/common/http.service';

@Component({
  selector: 'app-reedem-coin',
  templateUrl: './reedem-coin.component.html',
  styleUrls: ['./reedem-coin.component.css']
})
export class ReedemCoinComponent implements OnInit {

  constructor(private http:HttpService,private tostr:ToastrService) { }

  num:number;
  coinReedemDetail:CoinReedemDetail;

  ngOnInit(): void {


    this.loadData();
  }

  onSelect(event){
    this.num= event.target.value;
  }

  private loadData(){

    this.http.post<CoinReedemDetail>("CoinTransact/GetCoinReedemDetail",null).subscribe(res=>{
      this.coinReedemDetail = res;
    })
  }

  onReedemCoin(){

    let data={
      ProductNo:this.coinReedemDetail.ProductNo,
      Quantity:this.num
    }
    this.http.post<OKResponse>("CoinTransact/BuyCoin",data).subscribe(res=>{


      if(res.IsSuccess){
        this.tostr.toastrConfig.timeOut = 10000;
        this.tostr.success("Coin has been successfully placed for sell","Done");
        this.loadData();
      }
      else{
        this.tostr.error(res.Message,"Error !!");
      }

    },error=>{
      this.tostr.error("Please contact Admin.","Server Error");

    })
  }

}
