import { IBooking } from "../models/IBooking";

const ADMIN_API_URL = "https://school-restaurant-api.azurewebsites.net/api/booking";
const CUSTOMER_API_URL = "https://school-restaurant-api.azurewebsites.net/api/customer";

// Hämtar alla bokningar
export async function getAdminBookings(): Promise<IBooking[]> {
  const response = await fetch(ADMIN_API_URL);
  if (!response.ok) {
    throw new Error("Kunde inte hämta bokningar");
  }
  return response.json();
}

// Skapar en ny bokning
export async function createAdminBooking(booking: IBooking): Promise<IBooking> {
  const response = await fetch(ADMIN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa bokning");
  }
  return response.json();
}

// Uppdaterar en befintlig bokning
export async function updateAdminBooking(id: string, booking: IBooking): Promise<IBooking> {
  const response = await fetch(`${ADMIN_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte uppdatera bokning med ID: ${id}`);
  }
  return response.json();
}

// Tar bort en bokning
export async function deleteAdminBooking(id: string): Promise<void> {
  const response = await fetch(`${ADMIN_API_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Kunde inte radera bokning med ID: ${id}`);
  }
}

// Hämtar en kund baserat på kundens ID
export async function getCustomerById(customerId: string) {
  const response = await fetch(`${CUSTOMER_API_URL}/${customerId}`);
  if (!response.ok) {
    throw new Error(`Kunde inte hämta kund med ID: ${customerId}`);
  }
  return response.json();
}

// Uppdaterar en kunds information
export async function updateCustomer(customerId: string, customerData: any) {
  const response = await fetch(`${CUSTOMER_API_URL}/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte uppdatera kund med ID: ${customerId}`);
  }
  return response.json();
}
