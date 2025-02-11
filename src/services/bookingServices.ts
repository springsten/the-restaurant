import { IBooking } from "../models/IBooking";

const BASE_URL = "https://school-restaurant-api.azurewebsites.net";
const RESTAURANT_ID = "67ab206b6c6da27544081a1d";

export const createBooking = async () => {
  const response = await fetch(`${BASE_URL}/booking/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      restaurantId: RESTAURANT_ID,
      date: "2025-02-11",
      time: "18:00",
      numberOfGuests: 6,
      customer: {
        name: "Näslund",
        lastname: "Sakarias",
        email: "someone@somedomain.com",
        phone: "070-1112233",
      },
    }),
  });
  const data = await response.json();

  return data;
};

export const getBookings = async (): Promise<IBooking[]> => {
  const response = await fetch(
    `${BASE_URL}/booking/restaurant/${RESTAURANT_ID}`
  );

  if (!response.ok) {
    throw new Error(`Error, status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
