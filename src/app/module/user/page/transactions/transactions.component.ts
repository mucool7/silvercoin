import { Component, OnInit } from '@angular/core';
import { TransactionDetail } from 'src/app/module/contracts/transaction-detail';
import { HttpService } from 'src/app/service/common/http.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private http:HttpService) { }

  transactions:TransactionDetail[];

  ngOnInit(): void {

    this.getTransactions();

  }

  private getTransactions(){
    this.http.get<TransactionDetail[]>("Transactions/GetAllTransactions")
    .subscribe(res=>{
      this.transactions = res;
      console.log(res)
    })
  }

}
