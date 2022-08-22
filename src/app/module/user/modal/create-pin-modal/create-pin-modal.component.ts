import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, interval, Observable } from 'rxjs';
import { startWith, map, switchMap, flatMap, concatMap, take } from 'rxjs/operators';
import { HttpService } from 'src/app/service/common/http.service';

@Component({
  selector: 'app-create-pin-modal',
  templateUrl: './create-pin-modal.component.html',
  styleUrls: ['./create-pin-modal.component.css']
})
export class CreatePinModalComponent implements OnInit {

  constructor(private _dialogRef:MatDialogRef<CreatePinModalComponent>,private renderer:Renderer2,private _http:HttpService,private toaster:ToastrService) { }
  options: any[]=[]
  // filteredOptions: Observable<any>;
  filteredOptions: any;

  @ViewChild('searchUserText') searchUserText:any;
  form = new FormGroup(
    {
      user: new FormControl(null,Validators.required),
      pinCount:new FormControl(null,[Validators.required])
    }
  )

  ngOnInit() {
    this.filteredOptions = this.form.controls.user.valueChanges.pipe(
      concatMap( value =>  this._filter(value)),
    );

   
  }

  generatePin(){
    if(this.form.invalid){return;}
    const registrationNo = this.form.controls.user.value.RegistrationNo
    if(!registrationNo){

      this.toaster.error("Please select user name from the list only.");
      return;
    }
    const count = this.form.controls.pinCount.value

    this._http.post("master/GeneratePinFor?registrationNo="+registrationNo+"&count="+count,{}).subscribe((res:any)=>{

      if(res.IsSuccess){
        this.toaster.success("PIN Successfully generated");
        this._dialogRef.close();
      }
      else{
        this.toaster.error("Unable to generate PIN, please try later.")
      }

    },error=>{
      this.toaster.error("Something went wrong.")

    })
  }

  ngAfterViewInit(){
    // console.log(this.searchUserText);

    // this.renderer.listen(this.searchUserText.nativeElement,'input',(e)=>{
    //   console.log(e.target.value)
    // })
  }

  private  _filter(value: any){
    if(value instanceof Object){
      return EMPTY
    }
    return this._http.getNoLoader("master/SearchUser?str="+value).pipe(map((x:any)=>x.Data));
  }

  displayFn(user: any): string {
    return user && user.Name ? user.Name : '';
  }

 

}
