
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrationComponent } from './page/registration/registration.component';

const routes: Routes = [
  {
    path:"",component:LoginLayoutComponent,
    children:[
      {path:"",component:LoginComponent},
      {path:"login",component:LoginComponent},
      {path:"register",component:RegistrationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
