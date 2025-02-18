import { useEffect, useState } from "react";
import { IBookingResponse, ICustomer } from "../models/IBooking";
import { getBookings, getCustomer } from "../services/bookingServices";

const ShowBookings = () => {
  const [bookings, setBookings] = useState<
    (IBookingResponse & { customer?: ICustomer })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingsWithCustomers = async () => {
      try {
        setIsLoading(true);
        const data = await getBookings();

        const bookingsWithCustomers = await Promise.all(
          data.map(async (booking) => {
            const customer = await getCustomer(booking.customerId);
            return { ...booking, customer };
          })
        );

        setBookings(bookingsWithCustomers.reverse());
      } catch (err) {
        console.error("Kunde inte ladda bokningar: ", err);
        setError("Kunde inte ladda bokningar");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsWithCustomers();
  }, []);

  if (isLoading) return <div>Laddar...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>Inga bokningar hittade</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Datum</th>
          <th>Tid</th>
          <th>Antal gäster</th>
          <th>Namn</th>
          <th>Email</th>
          <th>Telefon</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id}>
            <td>{booking.date}</td>
            <td>{booking.time}</td>
            <td>{booking.numberOfGuests}</td>
            <td>
              {booking.customer
                ? `${booking.customer.name} ${booking.customer.lastname}`
                : "Okänd"}
            </td>
            <td>{booking.customer?.email || "Ingen email"}</td>
            <td>{booking.customer?.phone || "Ingen telefon"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowBookings;
