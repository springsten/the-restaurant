import { IBooking } from "../models/IBooking";
import { IAdminAction } from "../models/IAdminAction"; // Importera action-interfacet

// Reducer-funktion som hanterar state för admin-bokningar
export const adminReducer = (state: IBooking[], action: IAdminAction): IBooking[] => {
  switch (action.type) {
    case "SET_BOOKINGS": {
      const bookings: IBooking[] = JSON.parse(action.payload);
      return bookings;
    }

    case "ADD_BOOKING": {
      const newBooking: IBooking = JSON.parse(action.payload);
      return [...state, newBooking];
    }

    case "UPDATE_BOOKING": {
      const updatedBooking: IBooking = JSON.parse(action.payload);
      return state.map(booking =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      );
    }

    case "DELETE_BOOKING": {
      const deletedBookingId: string = JSON.parse(action.payload);
      return state.filter(booking => booking.id !== deletedBookingId);
    }

    default:
      return state;
  }
};
