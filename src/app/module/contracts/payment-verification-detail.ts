export interface PaymentVerificationDetail {

  PaymentRequestDetailNo: number;
  ReceivedDate: string;
  PaymentRequestNo: number;
  UpiDetailNo: number;
  BankDetailNo: number;
  ReceiptPath: string;
  IsReceived: boolean;
  RecieversRemark: string;
  OrderID: string;
  OrderDate: string;
  Amount: number;
  Quantity: number;
}
