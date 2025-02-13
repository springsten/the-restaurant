import { IBooking } from "../models/IBooking";

const ADMIN_API_URL = "https://your-api.com/admin/bookings"; 


export async function getAdminBookings() {
  const response = await fetch(ADMIN_API_URL);
  return response.json();
}

export async function createAdminBooking(booking: IBooking) {
  const response = await fetch(ADMIN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return response.json();
}


export async function updateAdminBooking(id: any, booking: any) {
  const response = await fetch(`${ADMIN_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return response.json();
}


export async function deleteAdminBooking(id: any) {
  await fetch(`${ADMIN_API_URL}/${id}`, { method: "DELETE" });
}