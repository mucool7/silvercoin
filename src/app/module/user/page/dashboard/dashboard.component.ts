import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DashboardFillValues } from 'src/app/module/contracts/dashboard-fill-values';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { HttpService } from 'src/app/service/common/http.service';
import { LocalStateService } from 'src/app/service/common/local-state.service';
import { BuyCoinComponent } from '../../modal/buy-coin/buy-coin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog,private stateService:LocalStateService,private http:HttpService) {}

  fillValues:DashboardFillValues;
  val=1;

  ngOnInit(): void {
    this.userData = this.stateService.getLocalStateObj<LoginResponse>('KUID');

    this.getFillValues();
  }
   userData:LoginResponse;

  onBuyCoin(){
    const dialogRef = this.dialog.open(BuyCoinComponent);
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        this.getFillValues();
      }
    })
  }

  private getFillValues(){
    this.http.get<DashboardFillValues>("Dashboard/GetDashboardFillValues").subscribe(res=>{
      this.fillValues= res;
    })

  }

}
