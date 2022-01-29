import { Component, OnInit } from '@angular/core';
import { UserSideNavService } from '../user-side-nav/user-side-nav.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(private _userSideNavService:UserSideNavService) { }

  ngOnInit(): void {
  }

  onMenuClick(){
    this._userSideNavService.toggleMenu();
  }

}
