export interface IBooking {
  id?: string;
  customer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
  date: string;
  time: string;
  numberOfGuests: number;
  restaurantId: string;
}
