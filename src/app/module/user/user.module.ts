import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { UserHeaderComponent } from 'src/app/components/user-header/user-header.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AccountActivationComponent } from './page/account-activation/account-activation.component';
import { BuyCoinComponent } from './modal/buy-coin/buy-coin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UserSideNavComponent } from 'src/app/components/user-side-nav/user-side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/service/common/http.service';
import { MatButtonModule } from '@angular/material/button';
import { NgxFormValidatorModule, NgxValidatorLabelService } from 'ngx-form-validator-super';
// import { NgxFormValidatorModule, NgxValidatorLabelService } from 'C:/working code/Angular Library/ngx-form/dist/ngx-form-validator';


import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import { BuyPinComponent } from './page/buy-pin/buy-pin.component';
import { ProfileComponent } from './page/profile/profile.component';
import { PaymentRequestComponent } from './page/payment-request/payment-request.component';
import { PaymentModalComponent } from './modal/payment-modal/payment-modal.component';
import { ReedemCoinComponent } from './page/reedem-coin/reedem-coin.component';
import { PaymentVerifyModalComponent } from './modal/payment-verify-modal/payment-verify-modal.component';
import { TransactionsComponent } from './page/transactions/transactions.component';
import { PinComponent } from './page/pin/pin.component';
import { CreatePinModalComponent } from './modal/create-pin-modal/create-pin-modal.component';
import { LevelIncomeDetailComponent } from './page/level-income-detail/level-income-detail.component';
@NgModule({
  declarations: [
    UserLayoutComponent,
    UserHeaderComponent,
    DashboardComponent,
    AccountActivationComponent,
    BuyCoinComponent,
    UserSideNavComponent,
    BuyPinComponent,
    ProfileComponent,
    PaymentRequestComponent,
    PaymentModalComponent,
    ReedemCoinComponent,
    PaymentVerifyModalComponent,
    TransactionsComponent,
    PinComponent,
    CreatePinModalComponent,
    LevelIncomeDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatButtonModule,
    MatBadgeModule,
    NgxFormValidatorModule.forRoot(),
    MatRadioModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule


  ],
  providers:[HttpService]
})
export class UserModule {
  constructor(private labelService:NgxValidatorLabelService){

    labelService.setValidationMsg(
      {
       required :"Required",
       email:"Invalid Email",
       minlength:'Must have 16 characters',
       maxlength:'Must have 16 characters',
      }
    )
  }
}
