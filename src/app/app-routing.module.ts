import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"",loadChildren:()=> import('./module/login/login.module').then(m=>m.LoginModule)},
  {path:"app",loadChildren:()=> import('./module/user/user.module').then(m=>m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
