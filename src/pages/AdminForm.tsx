import { useEffect, useState } from "react";
import { createAdminBooking, updateAdminBooking } from "../services/adminService";
import { IBooking } from "../models/IBooking";

function AdminForm({ dispatch, editingBooking }: { dispatch: any, editingBooking: IBooking | null }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    date: "",
    time: "",
    numberOfGuests: "1",
  });

  useEffect(() => {
    if (editingBooking) {
      setFormData({
        name: editingBooking.customer?.name || "",
        lastname: editingBooking.customer?.lastname || "",
        date: editingBooking.date || "",
        time: editingBooking.time || "",
        numberOfGuests: editingBooking.numberOfGuests.toString() || "1",
      });
    }
  }, [editingBooking]);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const booking: IBooking = {
      id: editingBooking ? editingBooking.id : Date.now().toString(),
      customer: {
        name: formData.name,
        lastname: formData.lastname,
        email: "",
        phone: "",
      },
      date: formData.date,
      time: formData.time,
      numberOfGuests: parseInt(formData.numberOfGuests),
      restaurantId: "",
    };

    try {
      if (editingBooking) {
        await updateAdminBooking(booking.id, booking);
        dispatch({ type: "UPDATE_BOOKING", payload: JSON.stringify(booking) });
      } else {
        await createAdminBooking(booking);
        dispatch({ type: "ADD_BOOKING", payload: JSON.stringify(booking) });
      }

      setFormData({ name: "", lastname: "", date: "", time: "", numberOfGuests: "1" });
    } catch (error) {
      console.error("Fel vid sparande av bokning:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Namn"
        required
      />

      <input
        type="text"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        placeholder="Efternamn"
        required
      />

      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />

      <input
        type="time"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        required
      />

      <input
        type="number"
        value={formData.numberOfGuests}
        onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
        placeholder="Antal gäster"
        required
      />

      <button type="submit">
        {editingBooking ? "Uppdatera" : "Lägg till"}
      </button>
    </form>
  );
}

export default AdminForm;
