import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { LocalStateService } from './local-state.service';
import { LoginResponse } from 'src/app/module/contracts/login-response';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient,private stateService:LocalStateService) {

    this._baseURL = environment.apiURL;
    this.httpCount.subscribe((res)=>{

      let httpCount =0;
      let isLoaderOpen =false;
      let timeOut = null;

      let setDuration=(timeout)=>{
        if(!timeOut){
          this.createLoader();
        timeOut =setTimeout(()=>{
            this.hideLoader()
        },timeout)
      }
      else{
         clearTimeout(timeOut);
         timeOut=null;
      }

      }

        if(res=='add'){
          httpCount++;
          if(httpCount>0){
              setDuration(40000);
          }
        }
        else{
          httpCount--;
          if(httpCount <=0){
            setTimeout(()=>{
            this.hideLoader();

            },250)
          }
        }




    })


  }
 private _baseURL:string;
 // private _baseURL ="http://192.168.1.14:5000/api/";
  private httpCount= new Subject();

  get baseURL (){
    return this._baseURL;
  }
  private getEndPoint(url:string){
    this.httpCount.next('add')
    url = url[0]=='/'?url.substr(1):url;
    return `${this._baseURL}${url}`
  }
  post<T>(url,data):Observable<T>{
    let header= this.getHeaders();
    return this.httpClient.post(this.getEndPoint(url),data,{headers:header})
    .pipe(
      map(x=> x as T),
      tap(()=>this.httpCount.next('remove')),
      catchError((x,caugth)=>{
        this.httpCount.next('remove');
        throw x;
      }))
  }
  get<T>(url):Observable<T>{
    let header= this.getHeaders();
    return this.httpClient.get(this.getEndPoint(url),{headers:header})
    .pipe(
      map(x=> x as T),
      tap(()=>this.httpCount.next('remove')),
      catchError((x,caugth)=>{
        this.httpCount.next('remove');
        throw x;
      }))
  }

  upload<T>(url,file,data):Observable<T> {

    this.httpCount.next('add')

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    for(let d of data){
    formData.append(d.name, d.value);

    }

    // Make http post request over api
    // with formData as req
    return this.post<T>(url,formData).pipe(
      map(x=> x as T),
      tap(()=>this.httpCount.next('remove')),
      catchError((x,caugth)=>{
        this.httpCount.next('remove');
        throw x;
      }))
}

  // private addHttpCount(){
  //   this.httpCount++;
  // }

  // private removeHttpCoun(){
  //   this.httpCount--;
  // }



  private getHeaders(){

    let loginData = this.stateService.getLocalStateObj<LoginResponse>('KUID');
    if(loginData?.LoginNo){
      let headers = new HttpHeaders({'LoginNo':loginData.LoginNo.toString()})
      return headers
    }

    return null;

  }


  private createLoader(){

    let div = document.createElement('div');
    div.style.position="fixed";
    div.style.top="0px";
    div.style.zIndex="100";
    div.style.width="100%";
    div.style.left="0px";
    div.style.height="100vh";
    div.style.display="flex";
    div.style.alignItems="center";
    div.style.justifyContent="center";
    div.style.backgroundColor="#00000033";
    div.id="__loader__main";

    div.innerHTML=`
      <div style="width:200px">
      <img src="assets/spinner.gif" style="width:100%" >
      </div>
    `
    document.getElementsByTagName('body')[0].append(div);
  }
  private hideLoader(){
    document.getElementById('__loader__main')?.remove();
  }

}
