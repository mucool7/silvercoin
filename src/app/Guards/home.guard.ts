import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginResponse } from '../module/contracts/login-response';
import { LocalStateService } from '../service/common/local-state.service';

@Injectable({providedIn: 'root'})
export class HomeGuard implements CanActivate {
  constructor(private stateService:LocalStateService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let userDetail = this.stateService.getLocalStateObj<LoginResponse>('KUID');

    if(!userDetail || !userDetail?.KYCVerified){

      this.router.navigateByUrl('app/activate')
      return false;
    }

    return true;
  }
}
