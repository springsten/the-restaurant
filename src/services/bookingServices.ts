import { IBooking } from "../models/IBooking";
import { IBookingResponse } from "../models/IBookingResponse";

export const BASE_URL = "https://school-restaurant-api.azurewebsites.net";
export const RESTAURANT_ID = "67ab206b6c6da27544081a1d";

export const createBooking = async (bookingData: IBooking) => {
  const response = await fetch(`${BASE_URL}/booking/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...bookingData,
    }),
  });
  const data = await response.json();

  return data;
};

export const getBookings = async (): Promise<IBookingResponse[]> => {
  const response = await fetch(
    `${BASE_URL}/booking/restaurant/${RESTAURANT_ID}`
  );

  if (!response.ok) {
    throw new Error(`Error, status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getCustomer = async (customerId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/customer/${customerId}`);
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Fel vid hämtning av kund:", error);
    return null;
  }
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/booking/delete/${bookingId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error deleting booking, status: ${response.status}`);
  }
};

export const editBooking = async (id: string, updatedBookingData: any) => {
  const response = await fetch(
    `https://school-restaurant-api.azurewebsites.net/booking/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBookingData),
    }
  );

  if (!response.ok) {
    throw new Error("Misslyckades med att uppdatera bokning");
  }

  // Kolla om svaret innehåller data innan vi försöker läsa JSON
  const text = await response.text();
  if (!text) {
    // Om inget svar returneras, returnera den uppdaterade bokningsdatan direkt
    return updatedBookingData;
  }

  return JSON.parse(text);
};
