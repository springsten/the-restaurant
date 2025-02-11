interface ICustomer {
  name: string;
  email: string;
  phone: string;
}

interface ICustomerResponse extends ICustomer {
  id: string;
}

interface IBookingDetails {
  date: string;
  time: string;
  numberOfGuests: number;
}

const Booking = () => {
  return (
    <>
      <section className="booking-container">
        <h1 className="booking-header">Gör en bokning</h1>
      </section>
    </>
  );
};

export default Booking;
