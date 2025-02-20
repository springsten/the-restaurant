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
import { CustomerForm } from "./CustomerForm";
import { BookingConfirmation } from "./BookingConfirmation";

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
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

  // funktion för att cleara allt användaren skrivit in när man stänger bekräftelse-modalen:
  const resetBookingForm = () => {
    setIsGuestSelected(false);
    setIsDateSelected(false);
    setIsTimeSelected(false);
    setBookingData({
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
    setBookings([]);
    setCalendarValue(new Date());
  };

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

  const handleCustomerFormSubmit = (updatedBookingData: IBooking) => {
    setBookingData(updatedBookingData);
    handleSubmit();
  };

  // Hantera formulärets inlämning
  const handleSubmit = async () => {
    const response = await createBooking(bookingData);
    console.log("Bokningen skapades:", response);
    setShowConfirmationModal(true);
  };

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
          <CustomerForm
            bookingData={bookingData}
            handleSubmitForm={handleCustomerFormSubmit} // Skicka handleSubmitForm till CustomerForm
          />
        </div>
      )}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <BookingConfirmation
              bookingData={bookingData}
              customer={bookingData.customer}
            />
            <button
              className="close-modal"
              onClick={() => {
                setShowConfirmationModal(false);
                resetBookingForm();
              }}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </>
  );
};
