import { IBookingResponse } from "../models/IBookingResponse";
import { ICustomer } from "../models/ICustomer";

interface EditBookingProps {
  booking: IBookingResponse & { customer?: ICustomer };
}

const EditBooking = ({ booking }: EditBookingProps) => {
  return (
    <div>
      <h2>Redigera Bokning</h2>
      <p>
        <strong>Boknings-ID:</strong> {booking._id}
      </p>
      <p>
        <strong>Datum:</strong> {booking.date}
      </p>
      <p>
        <strong>Tid:</strong> {booking.time}
      </p>
      <p>
        <strong>Antal gäster:</strong> {booking.numberOfGuests}
      </p>
      <p>
        <strong>Kundnamn:</strong>{" "}
        {booking.customer
          ? `${booking.customer.name} ${booking.customer.lastname}`
          : "Okänd"}
      </p>
      <p>
        <strong>Email:</strong> {booking.customer?.email || "Ingen email"}
      </p>
      <p>
        <strong>Telefon:</strong> {booking.customer?.phone || "Ingen telefon"}
      </p>
    </div>
  );
};

export default EditBooking;
