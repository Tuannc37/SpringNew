import {AppUser} from "./appUser";

export class CartSummary {
  id:number;
  code:string;
  address: string;
  appUser: AppUser;
  phone: string;
  date: string;
  status: number;
  totalQuantity: string;
  totalPrice: string;
}
