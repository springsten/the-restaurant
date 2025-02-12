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
  // state för vårt bokningsobjekt:
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

  // hanterar val av antal gäster:
  const [isGuestSelected, setIsGuestSelected] = useState(false);
  const guests = [1, 2, 3, 4, 5, 6];

  const handleGuestSelection = (num: number) => {
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

  // väljer datum:
  const [value, setValue] = useState(new Date());
  function onChange(userDate: Date) {
    setValue(userDate);
    setBookingData((prev) => ({
      ...prev,
      date: userDate.toISOString().split("T")[0],
    }));
    setIsDateSelected(true);
    console.log(bookingData);
  }

  // kollar så att användaren valt datum:
  const [isDateSelected, setIsDateSelected] = useState(false);

  // hanterar val av tid:
  const timeSlots = ["18:00", "21:00"];
  const handleTimeSlotSelection = (timeSlot: string) => {
    setBookingData((prev) => ({
      ...prev,
      time: timeSlot,
    }));
    console.table(bookingData);
  };

  return (
    <>
      {/* visar lista med val för antal gäster */}
      <div className="select-container">
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

      {/* visar kalender så att användaren kan välja datum */}
      {isGuestSelected && (
        <div className="select-container">
          <h2 className="booking-heading">Välj datum</h2>
          <Calendar onChange={onChange} value={value} />
        </div>
      )}

      {/* visar timeslots för sittning när användaren valt datum */}
      {isDateSelected && (
        <div className="select-container">
          <ul className="timeslot-list">
            {timeSlots.map((timeSlot) => (
              <li
                tabIndex={0}
                key={timeSlot}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleTimeSlotSelection(timeSlot)
                }
                role="button"
                className="timeslot-item"
                onClick={() => handleTimeSlotSelection(timeSlot)}
              >
                {timeSlot}
                <button
                  className="book-reservation"
                  onClick={() => handleTimeSlotSelection(timeSlot)}
                >
                  Boka
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
