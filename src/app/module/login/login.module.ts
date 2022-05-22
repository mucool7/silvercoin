import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { GuestHeaderComponent } from '../../components/guest-header/guest-header.component';
import { OTPComponent } from '../../components/controls/otp/otp.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { NgxFormValidatorModule, NgxValidatorLabelService } from 'ngx-form-validator-super';
// import { NgxFormValidatorModule, NgxValidatorLabelService } from 'C:/working code/Angular Library/ngx-form/dist/ngx-form-validator';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/service/common/http.service';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    LoginLayoutComponent,
    GuestHeaderComponent,
    RegistrationComponent,
    LoginComponent,
    OTPComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    NgxFormValidatorModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
})
export class LoginModule {

  constructor(private labelService:NgxValidatorLabelService){

    labelService.setValidationMsg(
      {
       required :"Required",
       email:"Invalid Email",
       phonelength:"Phone no. must be 10 digits long",
       password_mismatch:"Password doesn't matched."
      }
    )
  }

}
