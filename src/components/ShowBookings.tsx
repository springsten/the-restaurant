import { useEffect, useState } from "react";
import { IBookingResponse } from "../models/IBookingResponse";
import {
  deleteBooking,
  getBookings,
  getCustomer,
} from "../services/bookingServices";
import { ICustomer } from "../models/ICustomer";

const ShowBookings = () => {
  const [bookings, setBookings] = useState<
    (IBookingResponse & { customer?: ICustomer })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchBookingsWithCustomers();
  }, []);

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.error("Kunde inte ta bort bokning: ", err);
      setError("Kunde inte ta bort bokning");
    }
  };

  if (isLoading) return <div>Laddar...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>Inga bokningar hittade</div>;

  return (
    <>
      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Tid</th>
              <th>Antal gäster</th>
              <th>Namn</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Ändra</th>
              <th>Ta bort</th>
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
                <td>
                  <button className="edit-button">Ändra bokning</button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Ta bort bokning
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowBookings;
