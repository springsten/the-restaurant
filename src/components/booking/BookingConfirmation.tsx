interface IBookingSummaryProps {
  customer: {
    name: string;
    lastname: string;
  };
  bookingData: {
    numberOfGuests: number;
    date: string;
    time: string;
  };
}

export const BookingConfirmation = ({
  bookingData,
  customer,
}: IBookingSummaryProps) => {
  return (
    <div className="booking-summary">
      <h2>Bokat och klart!</h2>
      <p>
        Tack {customer.name} {customer.lastname} för din bokning
      </p>
      <p>
        Du har bokat ett bord för {bookingData.numberOfGuests}{" "}
        {bookingData.numberOfGuests === 1 ? "gäst" : "gäster"} den{" "}
        {bookingData.date} klockan {bookingData.time}
      </p>
    </div>
  );
};
