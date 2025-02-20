import { useEffect, useReducer } from "react";
import { getAdminBookings, deleteAdminBooking, createAdminBooking, getCustomerById, updateCustomer } from "../services/adminService";
import { adminReducer } from "../reducers/adminReducer";
import { IBooking } from "../models/IBooking";
import "../styles/Admin.scss";

function AdminDashboard() {
  const [bookings, dispatch] = useReducer(adminReducer, []);

  async function fetchData() {
    try {
      console.log("🔄 Hämtar bokningar...");
      const bookingsData = await getAdminBookings();

      const bookingsWithCustomers = await Promise.all(
        bookingsData.map(async (booking) => {
          if (booking.customerId) {
            try {
              const customer = await getCustomerById(booking.customerId);
              return { ...booking, customer };
            } catch (error) {
              console.error(`⚠️ Kunde inte hämta kundinfo för booking ${booking.id}`);
              return { ...booking, customer: null };
            }
          }
          return { ...booking, customer: null };
        })
      );

      dispatch({ type: "SET_BOOKINGS", payload: bookingsWithCustomers.reverse() });
      console.log("Bokningslista uppdaterad:", bookingsWithCustomers);
    } catch (error) {
      console.error(" Fel vid hämtning av bokningar:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreateBooking(newBooking: IBooking) {
    try {
      await createAdminBooking(newBooking);
      
      if (newBooking.customerId) {
        await updateCustomer(newBooking.customerId, newBooking.customer);
      }

      await fetchData();
    } catch (error) {
      console.error("Fel vid skapande av bokning:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAdminBooking(id);
      await fetchData();
    } catch (error) {
      console.error("Fel vid borttagning:", error);
    }
  }

  return (
    <div className="admin-dashboard">
      <h2>Bokningar</h2>
      <button className="refresh-btn" onClick={fetchData}>Uppdatera bokningar</button>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Namn</th>
            <th>Datum</th>
            <th>Tid</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.customer ? `${booking.customer.name} ${booking.customer.lastname}` : "Okänd kund"}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>
                <button className="edit-btn">Ändra</button>
                <button className="delete-btn" onClick={() => handleDelete(booking.id)}>Ta bort</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
