import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStateService {

  constructor() { }

  setLocalState(key:string,value:string){
    localStorage.setItem(key,value);
  }

  setLocalStateObj(key:string,value:any){
    let val = btoa( JSON.stringify(value));
    this.setLocalState(key,val);
  }
  getLocalState(key){
    return localStorage.getItem(key);
  }

  getLocalStateObj<T>(key){
    let val = this.getLocalState(key);
    if(!val){return null;}
    return JSON.parse(atob(val)) as T;
  }
}
