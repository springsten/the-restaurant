import { useEffect, useState } from "react";
import { createBooking } from "../services/bookingServices";

interface IBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
}

export const CreateBooking = () => {
  const [booking, setBooking] = useState<IBooking>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await createBooking();
      setBooking(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return <div>Här ska en bokning komma</div>;
};
