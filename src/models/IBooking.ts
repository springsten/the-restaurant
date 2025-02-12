import { ICustomer } from "./ICustomer";

export interface IBooking {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: ICustomer;
}
