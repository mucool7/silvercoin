import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/service/common/http.service';
import { environment } from 'src/environments/environment';
import { CreatePinModalComponent } from '../../modal/create-pin-modal/create-pin-modal.component';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  constructor(private _http:HttpService,private matDialoge:MatDialog) { }

  pins:any[]=[]
  isMaster=false;
  masterInfo:any[]=[];
  ngOnInit(): void {

    this._isMaster().subscribe((response:any)=>{

      if(response.IsSuccess){

        this.isMaster = true;
        this._getMasterPINDetail();

      }
      else{
        this._getUserPins();

      }

    })
  }


  createPin(){
    const ref = this.matDialoge.open(CreatePinModalComponent,{
      width:"90%",
      height:"300px"
    });
    ref.afterClosed().subscribe(e=>{
      this._getMasterPINDetail();
    })
  }


  private _getUserPins(){
    this._http.get("master/GetUserPin").subscribe((pins:any[])=>{
      console.log(pins)
      this.pins = pins
    })
  }

  private _isMaster(){
    return this._http.get("master/IsMaster")
  }

  private _getMasterPINDetail(){
    this._http.get("master/GetPinDetailForMaster").subscribe((res:any)=>{
      console.log(res);
      this.masterInfo = res.Data;
    })
  }
  

}
