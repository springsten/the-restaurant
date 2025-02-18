import React from "react";

interface IBookingSummaryProps {
  bookingData: {
    numberOfGuests: number;
    date: string;
    time: string;
  };
}

export const BookingSummary = ({ bookingData }: IBookingSummaryProps) => {
  return (
    <div className="booking-summary">
      <p>
        Du har valt ett bord för {bookingData.numberOfGuests}{" "}
        {bookingData.numberOfGuests === 1 ? "gäst" : "gäster"} den{" "}
        {bookingData.date} klockan {bookingData.time}
      </p>
    </div>
  );
};
