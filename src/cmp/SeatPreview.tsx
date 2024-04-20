import { Seat } from "../service/seat.service";

interface Props {
  seat: Seat | null;
  onSelectSeat: (seat: Seat | null) => void;
}

export function SeatPreview({ seat, onSelectSeat }: Props) {
  let isGap = "gap";
  let selected = "";
  if (seat) {
    isGap = "seat ";
    selected = seat.isAvailable ? "" : "selected";
  }
  return (
    <li onClick={() => onSelectSeat(seat)} className={isGap + selected}></li>
  );
}
