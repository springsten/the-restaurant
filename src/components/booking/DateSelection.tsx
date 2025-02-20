import Calendar from "react-calendar";

interface IDateSelectionProps {
  calendarValue: Date | null;
  onDateChange: (newDate: Date | null) => void;
}

export const DateSelection = ({
  calendarValue,
  onDateChange,
}: IDateSelectionProps) => {
  return (
    <div className="select-container">
      <h2 className="booking-heading">Välj datum</h2>
      <Calendar onChange={onDateChange} value={calendarValue} />
    </div>
  );
};
