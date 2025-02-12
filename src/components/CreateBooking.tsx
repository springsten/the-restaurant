import { useEffect, useState } from "react";
import { createBooking, RESTAURANT_ID } from "../services/bookingServices";
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
  const [isGuestSelected, setIsGuestSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
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
  const guests = [1, 2, 3, 4, 5, 6];

  const handleGuestSelection = (num: number) => {
    setBookingData((prev) => ({
      ...prev,
      numberOfGuests: num,
    }));
    setIsGuestSelected(true);
  };

  // väljer datum:
  const [calendarValue, setCalendarValue] = useState(new Date());
  const onChange = (userDate: Date) => {
    setCalendarValue(userDate);
    const formattedDate = userDate.toLocaleDateString("sv-SE");
    setBookingData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
    setIsDateSelected(true);
  };

  // kollar så att användaren valt datum:

  // hanterar val av tid:
  const timeSlots = ["18:00", "21:00"];
  const handleTimeSlotSelection = (timeSlot: string) => {
    setBookingData((prev) => ({
      ...prev,
      time: timeSlot,
    }));
    setIsTimeSelected(true);
  };

  // hanterar användarforumläret:
  const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const response = await createBooking(bookingData);
    console.log("Bokningen skapades:", response);
  };

  // useEffect(() => {
  //   console.log("Uppdaterad bookingData:", bookingData);
  // }, [bookingData]);

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
          <Calendar onChange={onChange} value={calendarValue} />
        </div>
      )}

      {/* visar timeslots för sittning när användaren valt datum */}
      {isDateSelected && (
        <div className="select-container">
          <h2 className="booking-heading">Välj tid för sittning</h2>
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

      {/* samlar in information om gästen */}
      {isTimeSelected && (
        <div className="select-container">
          <h2 className="booking-heading">Fyll i dina uppgifter</h2>
          <form className="customer-form">
            <div className="customer-input">
              <input
                type="text"
                name="name"
                placeholder="Förnamn"
                onChange={handleCustomerInput}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Efternamn"
                onChange={handleCustomerInput}
              />
              <input
                type="email"
                name="email"
                placeholder="din@epost.com"
                onChange={handleCustomerInput}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefonnummer"
                onChange={handleCustomerInput}
              />
            </div>
            <button
              type="button"
              className="confirm-booking"
              onClick={handleSubmit}
            >
              Bekräfta bokning
            </button>
          </form>
        </div>
      )}
    </>
  );
};
