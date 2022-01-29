import { BankDetail, UPIDetail } from "./account-detail"

export interface PaymentTransferDetailResponse {
  PaymentRequestNo: number;
  Amount: number
  DueDate: string
  UPIDetail: UPIDetail
  BankDetail: BankDetail

}
