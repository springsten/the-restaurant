import { ICustomer } from "../models/ICustomer";
import { BASE_URL } from "./bookingServices";

export const getCustomerById = async (
  customerId: number
): Promise<ICustomer> => {
  const response = await fetch(`${BASE_URL}/customer/${customerId}`);

  if (!response.ok) {
    throw new Error(`Error, status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
