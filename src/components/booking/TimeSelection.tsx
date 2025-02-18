interface ITimeSelectionProps {
  timeSlots: string[];
  selectedTime: string;
  onTimeSelect: (timeSlot: string) => void;
  getAvailableTables: (timeSlot: string) => number;
}

export const TimeSelection = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
  getAvailableTables,
}: ITimeSelectionProps) => {
  return (
    <div className="select-container">
      <h2 className="booking-heading">Välj tid för sittning</h2>

      <ul className="timeslot-list">
        {timeSlots.map((timeSlot) => {
          const availableTables = getAvailableTables(timeSlot);
          return (
            <li
              tabIndex={0}
              key={timeSlot}
              onKeyDown={(e) => e.key === "Enter" && onTimeSelect(timeSlot)}
              role="button"
              className={`timeslot-item ${
                availableTables > 0 ? "" : "fully-booked"
              } ${selectedTime === timeSlot ? "selected-time" : ""}`}
            >
              {timeSlot}
              <span className="available-tables">
                {availableTables > 0
                  ? availableTables + " lediga bord"
                  : "Fullbokat"}
              </span>
              <button
                className={
                  availableTables > 0 ? "book-reservation" : "fully-booked-btn"
                }
                onClick={() =>
                  availableTables > 0
                    ? onTimeSelect(timeSlot)
                    : alert("Inga lediga bord")
                }
                disabled={availableTables <= 0}
              >
                Boka
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
