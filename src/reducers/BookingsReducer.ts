export interface Customer {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface BookingState {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: Customer;
}

export const BookingsReducer = ()