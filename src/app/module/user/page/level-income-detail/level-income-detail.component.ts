import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/common/http.service';

@Component({
  selector: 'app-level-income-detail',
  templateUrl: './level-income-detail.component.html',
  styleUrls: ['./level-income-detail.component.css']
})
export class LevelIncomeDetailComponent implements OnInit {

  constructor(private _http:HttpService) { }

  levelIncomes:any[]=[]

  ngOnInit(): void {
    this._getLevelIncomes();
  }

  private _getLevelIncomes(){
    this._http.get("Transactions/GetLevelIncomes").subscribe((res:any)=>{
      this.levelIncomes = res.Data;
    })
  }

}
