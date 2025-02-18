import { useState } from "react";

interface IBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
}

export const CustomerForm = ({
  bookingData,
  handleSubmitForm,
}: {
  bookingData: IBooking;
  handleSubmitForm: (data: IBooking) => void;
}) => {
  const [formData, setFormData] = useState({
    name: bookingData.customer.name,
    lastname: bookingData.customer.lastname,
    email: bookingData.customer.email,
    phone: bookingData.customer.phone,
  });

  const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 className="booking-heading">Fyll i dina uppgifter</h2>
      <form className="customer-form">
        <div className="customer-input">
          <input
            type="text"
            name="name"
            placeholder="Förnamn"
            onChange={handleCustomerInput}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Efternamn"
            onChange={handleCustomerInput}
          />
          <input
            type="email"
            name="email"
            placeholder="din@epost.com"
            onChange={handleCustomerInput}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefonnummer"
            onChange={handleCustomerInput}
          />
        </div>
        <button
          type="button"
          className="confirm-booking"
          onClick={handleSubmit}
        >
          Bekräfta bokning
        </button>
      </form>
    </>
  );
};
