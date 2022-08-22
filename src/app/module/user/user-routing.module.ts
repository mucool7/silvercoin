import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from 'src/app/Guards/home.guard';
import { AccountActivationComponent } from './page/account-activation/account-activation.component';
import { BuyPinComponent } from './page/buy-pin/buy-pin.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LevelIncomeDetailComponent } from './page/level-income-detail/level-income-detail.component';
import { PaymentRequestComponent } from './page/payment-request/payment-request.component';
import { PinComponent } from './page/pin/pin.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ReedemCoinComponent } from './page/reedem-coin/reedem-coin.component';
import { TransactionsComponent } from './page/transactions/transactions.component';
import { UserLayoutComponent } from './user-layout.component';

const routes: Routes = [
  {
    path:"",component:UserLayoutComponent,
    children:[
      {path:"home",component:DashboardComponent,canActivate:[HomeGuard]},
      {path:"activate",component:AccountActivationComponent},
      {path:"pin",component:BuyPinComponent},
      {path:"account",component:ProfileComponent,data:{home:true}},
      {path:"paymentrequest",component:PaymentRequestComponent},
      {path:"reedem",component:ReedemCoinComponent},
      {path:"transactions",component:TransactionsComponent},
      {path:"pindetail",component:PinComponent},
      {path:"levelincomedetail",component:LevelIncomeDetailComponent},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
