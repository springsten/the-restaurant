import { useEffect, useReducer, useState } from "react";
import { getAdminBookings, deleteAdminBooking } from "../services/adminService";
import { adminReducer } from "../reducers/adminReducer";
import AdminForm from "./AdminForm";

function AdminDashboard() {
  const [bookings, dispatch] = useReducer(adminReducer, []);
  const [editingBooking, setEditingBooking] = useState(null);

  
  useEffect(() => {
    getAdminBookings()
      .then((data) => dispatch({ type: "SET_BOOKINGS", payload: data.reverse() }))
      .catch((error) => console.error("Fel vid hämtning av bokningar:", error));
  }, []);


  async function handleDelete(id: string) {
    try {
      await deleteAdminBooking(id);
      dispatch({ type: "DELETE_BOOKING", payload: id });
    } catch (error) {
      console.error("Fel vid borttagning:", error);
    }
  }

  function handleEdit(booking: any) {
    setEditingBooking(booking);
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AdminForm dispatch={dispatch} editingBooking={editingBooking} />
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h3>Bokning:</h3>
          <p>{booking.customer?.name || "Inget namn"}</p>
          <p>{booking.customer?.lastname || "Inget efternamn"}</p>
          <p>Datum: {booking.date}</p>
          <p>Tid: {booking.time}</p>
          <p>Antal gäster: {booking.numberOfGuests}</p>
          <button onClick={() => handleEdit(booking)}>✏️ Redigera</button>
          <button onClick={() => handleDelete(booking.id)}>Ta bort</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
