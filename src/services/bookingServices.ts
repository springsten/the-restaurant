import { IBooking } from "../models/IBooking";

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
