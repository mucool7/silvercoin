export interface AccountDetail {
  LoginNo:number;
  PIN:string;
  SeniorName:string;
  SeniorMobile:string;
  KYCDetail:KYCDetail;
  BankDetails:BankDetail[];
  UPIDetail:UPIDetail;
}

export interface KYCDetail{

  KycdetailNo :number;
  RegistrationNo :number;
  Email :string;
  EmailVerifiedDate :string;
  PhoneNo :string;
  PhoneNoVerifiedDate :string;
  Panno :string;
  PannoVerifiedDate :string;
}

export class BankDetail{
  BankDetailNo:number;
  RegistrationNo:number;
  BankName:string;
  AccountNumber:string;
  Ifccode:string;
  AccountHolderName:string;
}

export class UPIDetail{
  UpidetailNo:number;
  RegistrationNo:number;
  UpitypeNo:number;
  UpiName?:string;
  Upiid:string;
  Verified:boolean;
}
