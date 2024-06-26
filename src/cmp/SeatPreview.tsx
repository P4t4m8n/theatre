import { Seat } from "../service/seat.service";

interface Props {
  seat: Seat | null;
  onSelectSeat: (seat: Seat | null) => void;
  onMouseDown: (ev:React.MouseEvent|React.TouchEvent,seat: Seat | null) => void;
  isMouseDown: boolean;
  selected: boolean;
}

export function SeatPreview({
  seat,
  onSelectSeat,
  onMouseDown,
  isMouseDown,
  selected,
}: Props) {
  let className = "gap";
  if (seat) {
    className = seat.isAvailable ? "seat" : "reserved";
    if (selected) {
      className += " selected";
    }
  }

  const handleMouseEnter = () => {
    if (!isMouseDown || !seat?.isAvailable) return;
    onSelectSeat(seat);
  };

  return (
    <li
      onMouseDown={(ev) => onMouseDown(ev,seat)}
      onMouseEnter={handleMouseEnter}
      className={className}
    ></li>
  );
}
