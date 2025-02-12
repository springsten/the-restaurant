import { useState } from "react";
import { RESTAURANT_ID } from "../services/bookingServices";

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
  const [bookingData, setBookingData] = useState<IBooking>({
    restaurantId: RESTAURANT_ID,
    date: "",
    time: "",
    numberOfGuests: 1,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  const guests = [1, 2, 3, 4, 5, 6];

  const handleGuestSelection = (num) => {
    setBookingData((prev) => ({
      ...prev,
      numberOfGuests: num,
    }));
  };

  return (
    <>
      <h2 className="">Välj antal gäster</h2>
      <ul className="guest-list">
        {guests.map((num) => (
          <li
            type="button"
            key={num}
            className={"guest-selection-button"}
            onClick={() => handleGuestSelection(num)}
          >
            {num} {num === 1 ? "gäst" : "gäster"}
          </li>
        ))}
      </ul>
    </>
  );
};
