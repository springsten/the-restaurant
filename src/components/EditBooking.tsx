import { useEffect, useState } from "react";
import { IBookingResponse } from "../models/IBookingResponse";
import { ICustomer } from "../models/ICustomer";
import { editBooking } from "../services/bookingServices";

interface EditBookingProps {
  booking: IBookingResponse & { customer?: ICustomer };
  onBookingUpdated: (updatedBooking: IBookingResponse) => void;
}

const EditBooking = ({ booking, onBookingUpdated }: EditBookingProps) => {
  const [formData, setFormData] = useState({
    date: booking.date,
    time: booking.time,
    numberOfGuests: booking.numberOfGuests,
    customerId: booking.customerId,
    restaurantId: booking.restaurantId,
  });

  // uppdatera formData när booking ändras
  useEffect(() => {
    console.log("Ny bokning: ", booking);
    setFormData({
      date: booking.date,
      time: booking.time,
      numberOfGuests: booking.numberOfGuests,
      customerId: booking.customerId,
      restaurantId: booking.restaurantId,
    });
  }, [booking]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // förbered bokningsdata för att uppdatera
    const updatedBookingData = {
      id: booking._id,
      restaurantId: formData.restaurantId,
      date: formData.date,
      time: formData.time,
      numberOfGuests: formData.numberOfGuests,
      customerId: formData.customerId,
    };

    try {
      const updatedBooking = await editBooking(booking._id, updatedBookingData);

      console.log("Bokning uppdaterad:", updatedBooking);
      onBookingUpdated(updatedBooking);
    } catch (err) {
      console.error("Fel vid uppdatering av bokning:", err);
    }
  };

  return (
    <div className="edit-booking-container">
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
      <h3>Redigera bokning</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Datum</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="time">Tid</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="18:00">18:00</option>
            <option value="21:00">21:00</option>
          </select>
        </div>

        <div>
          <label htmlFor="numberOfGuests">Antal gäster</label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            min="1"
            max="6"
            required
          />
        </div>

        <div>
          <button type="submit">Spara ändringar</button>
        </div>
      </form>
    </div>
  );
};

export default EditBooking;
