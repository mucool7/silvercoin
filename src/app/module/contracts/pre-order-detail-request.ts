export interface PreOrderDetailRequest {
  key: string; // Enter the Key ID generated from the Dashboard
  amount: string; // Amount is in currency subunits. Default currency is INR. Hence; 50000 refers to 50000 paise
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string; //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  callback_url: string;
  prefill: PreFill;
  order_reciept:string;
  handler:(response:any)=>void;
}

export interface PreFill{
  name:string;
  email:string;
  contact:string;
}
