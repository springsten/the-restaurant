interface IGuestSelectionProps {
  selectedGuests: number;
  onGuestSelect: (num: number) => void;
}

export const GuestSelection = ({
  selectedGuests,
  onGuestSelect,
}: IGuestSelectionProps) => {
  const guests = [1, 2, 3, 4, 5, 6];

  return (
    <div className="select-container">
      <h2 className="booking-heading">Välj antal gäster</h2>
      <ul className="guest-list">
        {guests.map((num) => (
          <li
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onGuestSelect(num)}
            role="button"
            key={num}
            className="guest-item"
            style={{
              backgroundColor: selectedGuests === num ? "#eee" : "white",
              fontWeight: selectedGuests === num ? "500" : "300",
            }}
            onClick={() => onGuestSelect(num)}
          >
            {num} {num === 1 ? "gäst" : "gäster"}
          </li>
        ))}
      </ul>
    </div>
  );
};
