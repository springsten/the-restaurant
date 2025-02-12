import { useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/bookingServices";

const ShowBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const data = await getBookings();
        console.log("Hämtade bokningar:", data);
        setBookings(data.reverse());
      } catch (err) {
        console.error("Kunde inte ladda bokningar: ", err);
        setError("Kunde inte ladda bokningar");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) return <div>Laddar...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>Inga bokningar hittade</div>;

  return (
    <div>
      <h1>Bokningar för restaurangen:</h1>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h3>Bokning:</h3>
          <p>{booking.customer?.name || "Inget namn"}</p>
          <p>{booking.customer?.lastname || "Inget efternamn"}</p>
          <p>Datum: {booking.date}</p>
          <p>Tid: {booking.time}</p>
          <p>Antal gäster:{booking.numberOfGuests}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowBookings;
