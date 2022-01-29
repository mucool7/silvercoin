import { MasterDataResponse } from "./master-data-response";

export interface CoinReedemDetail {
  CoinPrice :number;
  MinimumReedemableAmount :number;
  UserCoins :number;
  TotalBalance :number;
  ReedemableOptions :MasterDataResponse[];
  ProductNo:number;
}
