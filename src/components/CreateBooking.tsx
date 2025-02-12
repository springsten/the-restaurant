import { useEffect, useState } from "react";
import { RESTAURANT_ID } from "../services/bookingServices";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  const [isGuestSelected, setIsGuestSelected] = useState(false);
  const guests = [1, 2, 3, 4, 5, 6];

  const handleGuestSelection = (num) => {
    setBookingData((prev) => ({
      ...prev,
      numberOfGuests: num,
    }));
    setIsGuestSelected(true);
  };

  // kontrollera att numberOfGuests ändras:
  useEffect(() => {
    console.table(bookingData);
  }, [bookingData]);

  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <>
      <div className="select-guests">
        <h2 className="booking-heading">Välj antal gäster</h2>
        <ul className="guest-list">
          {guests.map((num) => (
            <li
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleGuestSelection(num)}
              role="button"
              key={num}
              className="guest-item"
              style={{
                backgroundColor:
                  bookingData.numberOfGuests === num ? "#eee" : "white",
                fontWeight: bookingData.numberOfGuests === num ? "500" : "300",
              }}
              onClick={() => handleGuestSelection(num)}
            >
              {num} {num === 1 ? "gäst" : "gäster"}
            </li>
          ))}
        </ul>
      </div>

      {isGuestSelected && (
        <div className="select-date">
          <h2 className="booking-heading">Välj datum</h2>
          <Calendar onChange={onChange} value={value} />
        </div>
      )}
    </>
  );
};
