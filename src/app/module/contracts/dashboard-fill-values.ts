export interface DashboardFillValues {
  CoinDetail: CoinDetail;
  RecentOrders:RecentOrder[];
  IncomeDetail:IncomeDetail;
  PaymentRequestCount:number;
}

export interface CoinDetail {
  ProductNo: number;
  Name: string;
  PricePerCoin: number;
}

export class RecentOrder {
  OrderID: number
  Type: string
  Date: string
  Amount: string
  Qty: string
  Status: string
  StatusNo: number
}
export class IncomeDetail {
  TotalAmount: number
  TotalCoin: number
  DirectAmount: number
  DirectCoin: number
  LevelAmount: number
  LevelCoin: number
  LevelCount: number

}
