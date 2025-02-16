import { useEffect, useReducer, useState } from "react";
import { getAdminBookings, deleteAdminBooking } from "../services/adminService";
import { adminReducer } from "../reducers/adminReducer";
import AdminForm from "./AdminForm";

function AdminDashboard() {
  // useReducer används för att hantera state för bokningar.
  const [bookings, dispatch] = useReducer(adminReducer, []);

  // useState används för att hålla reda på vilken bokning som redigeras.
  const [editingBooking, setEditingBooking] = useState(null);

  // useEffect körs en gång vid inläsning och hämtar bokningar från API:et.
  useEffect(() => {
    getAdminBookings()
      .then((data) => 
        // Uppdaterar state med hämtade bokningar i omvänd ordning
        dispatch({ type: "SET_BOOKINGS", payload: data.reverse() })
      )
      .catch((error) => console.error("Fel vid hämtning av bokningar:", error));
  }, []);

  // Funktion för att ta bort en bokning
  async function handleDelete(id: string) {
    try {
      // Anropar API:et för att radera bokningen
      await deleteAdminBooking(id);
      
      // Uppdaterar state genom att skicka en DELETE_BOOKING action till reducern
      dispatch({ type: "DELETE_BOOKING", payload: id });
    } catch (error) {
      console.error("Fel vid borttagning:", error);
    }
  }

  // Funktion för att sätta en bokning i redigeringsläge
  function handleEdit(booking: any) {
    setEditingBooking(booking);
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Formulärkomponent för att skapa/redigera en bokning */}
      <AdminForm dispatch={dispatch} editingBooking={editingBooking} />

      {/* Loopar igenom bokningar och visar dem */}
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h3>Bokning:</h3>
          
          {/* Visar kundens namn eller en fallback-text om det saknas */}
          <p>{booking.customer?.name || "Inget namn"}</p>
          <p>{booking.customer?.lastname || "Inget efternamn"}</p>

          {/* Visar bokningens datum, tid och antal gäster */}
          <p>Datum: {booking.date}</p>
          <p>Tid: {booking.time}</p>
          <p>Antal gäster: {booking.numberOfGuests}</p>

          {/* Knapp för att redigera bokningen */}
          <button onClick={() => handleEdit(booking)}>✏️ Redigera</button>

          {/* Knapp för att ta bort bokningen */}
          <button onClick={() => handleDelete(booking.id || "")}>Ta bort</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
