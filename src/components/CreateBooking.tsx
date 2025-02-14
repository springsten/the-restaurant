import { useEffect, useState } from "react";
import { createBooking, RESTAURANT_ID } from "../services/bookingServices";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingInfo } from "./BookingInfo";

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
  // state som kollar så att användaren har tagit sig igenom föregående steg i processen:
  const [isGuestSelected, setIsGuestSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  // state
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
  const handleGuestSelection = (num: number) => {
    setBookingData((prev) => ({
      ...prev,
      numberOfGuests: num,
    }));
    setIsGuestSelected(true);
  };

  // väljer datum:
  // const [calendarValue, setCalendarValue] = useState(new Date());
  const onChange = (userDate: Date) => {
    setCalendarValue(userDate);
    const formattedDate = userDate.toLocaleDateString("sv-SE");

    setBookingData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
    setIsDateSelected(true);
  };

  // hanterar val av tid:
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
      <BookingInfo
        onGuestSelect={handleGuestSelection}
        onDateSelect={onChange}
        onTimeSelect={handleTimeSlotSelection}
      ></BookingInfo>

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
