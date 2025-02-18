import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/src/shared/types.js";

interface IBookingInfoProps {
  //   guests: number[]; // En array m. tillgängliga antal gäster
  //   timeSlots: string[]; // En array m. tillgängliga tider
  bookingData: {
    numberOfGuests: number; // Antal gäster som användaren har valt
    date: string; // Datum som användaren har valt
    time: string; // Tid som användaren har valt
  };
  onGuestSelect: (num: number) => void; // Funktion som hanterar val av antal gäster
  onDateSelect: (date: Date) => void; // hanterar val av datum
  onTimeSelect: (time: string) => void; // hanterar val av tid
}

// hanterar val av antal gäster:
const guests = [1, 2, 3, 4, 5, 6];

// hanterar val av tid:
const timeSlots = ["18:00", "21:00"];

export const BookingInfo = ({
  bookingData,
  onGuestSelect,
  onDateSelect,
  onTimeSelect,
}: IBookingInfoProps) => {
  // väljer datum:
  const [calendarValue, setCalendarValue] = useState(new Date());

  useEffect(() => {
    if (bookingData.date) {
      const dateObject = new Date(bookingData.date); // Omvandla sträng till Dateobject! HOPPAS
      setCalendarValue(dateObject);
    }
  }, [bookingData.date]);

  const handleDateChange = (userDate: Value) => {
    if (userDate instanceof Date && !isNaN(userDate.getTime())) {
      setCalendarValue(userDate);
      onDateSelect(userDate);
    } else {
      console.log("Ogiltigt datum valt");
    }
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
              onKeyDown={(e) => e.key === "Enter" && onGuestSelect(num)}
              role="button"
              key={num}
              className="guest-item"
              style={{
                backgroundColor:
                  bookingData.numberOfGuests === num ? "#eee" : "white",
                fontWeight: bookingData.numberOfGuests === num ? "500" : "300",
              }}
              onClick={() => onGuestSelect(num)}
            >
              {num} {num === 1 ? "gäst" : "gäster"}
            </li>
          ))}
        </ul>
      </div>

      {/* visar kalender så att användaren kan välja datum */}
      {bookingData.numberOfGuests > 0 && (
        <div className="select-container">
          <h2 className="booking-heading">Välj datum</h2>
          <Calendar value={calendarValue} onChange={handleDateChange} />
        </div>
      )}

      {/* visar timeslots för sittning när användaren valt datum */}
      {bookingData.date && (
        <div className="select-container">
          <h2 className="booking-heading">Välj tid för sittning</h2>
          <ul className="timeslot-list">
            {timeSlots.map((timeSlot) => (
              <li
                tabIndex={0}
                key={timeSlot}
                onKeyDown={(e) => e.key === "Enter" && onTimeSelect(timeSlot)}
                role="button"
                className="timeslot-item"
                onClick={() => onTimeSelect(timeSlot)}
              >
                {timeSlot}
                <button
                  className="book-reservation"
                  onClick={() => onTimeSelect(timeSlot)}
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
