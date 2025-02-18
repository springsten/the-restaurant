import { useState } from "react";
import {
  createBooking,
  getBookings,
  RESTAURANT_ID,
} from "../../services/bookingServices";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GuestSelection } from "./GuestSelection";
import { TimeSelection } from "./TimeSelection";
import { BookingSummary } from "./BookingSummary";

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

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGuestSelection = (num: number) => {
    setBookingData((prev) => ({
      ...prev,
      numberOfGuests: num,
    }));
    setIsGuestSelected(true);
  };

  // väljer datum:
  const [calendarValue, setCalendarValue] = useState(new Date());

  const onChange = async (userDate: Date) => {
    setCalendarValue(userDate);
    const formattedDate = userDate.toLocaleDateString("sv-SE");

    setBookingData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
    setIsDateSelected(true);

    setLoading(true);
    try {
      const allBookings = await getBookings();
      const filteredBookings = allBookings.filter(
        (booking) => booking.date === formattedDate
      );
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Kunde inte hämta bokningar (datum)", error);
    }

    setLoading(false);
  };

  const getAvailableTables = (timeSlot: string) => {
    const maxTables = 15;

    const bookingsForTime = bookings.filter((b) => b.time === timeSlot);
    const bookedTables = Math.ceil(
      bookingsForTime.reduce((sum, b) => sum + b.numberOfGuests, 0) / 6
    );

    return maxTables - bookedTables;
  };

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
      {/* väljer antal gäster */}
      <GuestSelection
        selectedGuests={bookingData.numberOfGuests}
        onGuestSelect={handleGuestSelection}
      />

      {/* visar kalender så att användaren kan välja datum */}
      {isGuestSelected && (
        <div className="select-container">
          <h2 className="booking-heading">Välj datum</h2>
          <Calendar onChange={onChange} value={calendarValue} />
        </div>
      )}

      {/* visar timeslots för sittning när användaren valt datum */}
      {isDateSelected && (
        <TimeSelection
          timeSlots={timeSlots}
          selectedTime={bookingData.time}
          onTimeSelect={handleTimeSlotSelection}
          getAvailableTables={getAvailableTables}
        />
      )}

      {/* visar en summering över användarens val */}
      {isTimeSelected && (
        <div className="select-container">
          <BookingSummary bookingData={bookingData} />

          {/* samlar in information om gästen */}
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
