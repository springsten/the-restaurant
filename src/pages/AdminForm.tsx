import { useEffect, useState } from "react";
import { createAdminBooking, updateAdminBooking } from "../services/adminService";
import { IBooking } from "../models/IBooking";

function AdminForm({ dispatch, editingBooking }: { dispatch: any, editingBooking: IBooking | null }) {
  // State för att hantera formulärets inmatningsvärden
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    date: "",
    time: "",
    numberOfGuests: "1", // Standardvärde för antal gäster
  });

  // useEffect uppdaterar formuläret om en bokning ska redigeras
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
  }, [editingBooking]); // Körs varje gång editingBooking ändras

  // Funktion för att hantera formulärets inskickning
  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault(); // Förhindrar sidladdning

    // Skapar ett bokningsobjekt baserat på formulärets data
    const booking: IBooking = {
      id: editingBooking ? editingBooking.id : Date.now().toString(), // Skapa nytt ID om det är en ny bokning
      customer: {
        name: formData.name,
        lastname: formData.lastname,
        email: "", // Placeholder för framtida funktionalitet
        phone: "",
      },
      date: formData.date,
      time: formData.time,
      numberOfGuests: parseInt(formData.numberOfGuests), // Konvertera till nummer
      restaurantId: "", // Placeholder för restaurang-ID
    };

    try {
      if (editingBooking) {
        // Om en bokning redigeras, uppdatera den i databasen
        await updateAdminBooking(booking.id, booking);
        dispatch({ type: "UPDATE_BOOKING", payload: JSON.stringify(booking) });
      } else {
        // Om det är en ny bokning, skapa den i databasen
        await createAdminBooking(booking);
        dispatch({ type: "ADD_BOOKING", payload: JSON.stringify(booking) });
      }

      // Återställ formuläret efter att bokningen har skickats
      setFormData({ name: "", lastname: "", date: "", time: "", numberOfGuests: "1" });
    } catch (error) {
      console.error("Fel vid sparande av bokning:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Namn-input */}
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Namn"
        required
      />

      {/* Efternamn-input */}
      <input
        type="text"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        placeholder="Efternamn"
        required
      />

      {/* Datum-input */}
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />

      {/* Tid-input */}
      <input
        type="time"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        required
      />

      {/* Antal gäster-input */}
      <input
        type="number"
        value={formData.numberOfGuests}
        onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
        placeholder="Antal gäster"
        required
      />

      {/* Skicka-knapp, ändrar text beroende på om det är en ny bokning eller en uppdatering */}
      <button type="submit">
        {editingBooking ? "Uppdatera" : "Lägg till"}
      </button>
    </form>
  );
}

export default AdminForm;
