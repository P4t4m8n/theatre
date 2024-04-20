import { Seat } from "../service/seat.service";
import { SeatPreview } from "./SeatPreview";

interface Props {
  seats: (Seat | null)[][];
  onSelectSeat: (seat: Seat | null) => void;
  onMouseDown: (ev:React.MouseEvent|React.TouchEvent,seat: Seat | null) => void;
  isMouseDown: boolean;
  selectedSeats: Seat[];
}

export function SeatList({
  seats,
  onSelectSeat,
  onMouseDown,
  isMouseDown,
  selectedSeats,
}: Props) {
  return (
    <ul>
      {seats.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((seat,jdx) => (
            <SeatPreview
              onMouseDown={onMouseDown}
              onSelectSeat={onSelectSeat}
              isMouseDown={isMouseDown}
              seat={seat}
              selected={selectedSeats.some((s) => s.id === seat?.id)}
              key={jdx}
            />
          ))}
        </div>
      ))}
    </ul>
  );
}
