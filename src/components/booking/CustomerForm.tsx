import { useState } from "react";
import { IBooking } from "../../models/IBooking";

interface CustomerFormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  consent?: string;
}

export const CustomerForm = ({
  bookingData,
  handleSubmitForm,
}: {
  bookingData: IBooking;
  handleSubmitForm: (data: IBooking) => void;
}) => {
  // initialiserar state för formuläret:
  const [formData, setFormData] = useState<CustomerFormData>({
    name: bookingData.customer.name,
    lastname: bookingData.customer.lastname,
    email: bookingData.customer.email,
    phone: bookingData.customer.phone,
  });

  // gdpr:
  const [consentGiven, setConsentGiven] = useState(false);

  // initialiserear state för error:
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentGiven(e.target.checked);
  };

  // validerar formuläret:
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Du måste skriva in ett förnamn!";
    if (!formData.lastname)
      newErrors.lastname = "Du måste skriva in ett efternamn!";
    if (!formData.email) {
      newErrors.email = "Du måste skriva in en epostadress!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ogiltig epostadress!";
    }
    if (!formData.phone)
      newErrors.phone = "Du måste skriva in ett telefonnummer!";

    if (!consentGiven) newErrors.consent = "Du måste godkänna våra villkor!";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      const customerData = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
      };

      handleSubmitForm({
        ...bookingData,
        customer: customerData,
      });
    }
  };

  return (
    <>
      <h2 className="booking-heading">Fyll i dina uppgifter</h2>
      <form className="customer-form">
        <div className="input-field">
          <div className="customer-input">
            <input
              type="text"
              name="name"
              placeholder="Förnamn"
              value={formData.name}
              onChange={handleCustomerInput}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>

          <div className="customer-input">
            <input
              type="text"
              name="lastname"
              placeholder="Efternamn"
              value={formData.lastname}
              onChange={handleCustomerInput}
            />
            {errors.lastname && <span>{errors.lastname}</span>}
          </div>

          <div className="customer-input">
            <input
              type="email"
              name="email"
              placeholder="din@epost.com"
              value={formData.email}
              onChange={handleCustomerInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="customer-input">
            <input
              type="tel"
              name="phone"
              placeholder="Telefonnummer"
              value={formData.phone}
              onChange={handleCustomerInput}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </div>
        </div>

        <div className="consent-input">
          <label>
            <input
              className="consent"
              type="checkbox"
              checked={consentGiven}
              onChange={handleCheckboxChange}
            />
            Jag godkänner att mina uppgifter behandlas i enlighet med GDPR och
            enligt vår integritetspolicy
          </label>
          {errors.consent && <span>{errors.consent}</span>}
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
