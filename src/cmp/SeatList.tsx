import { Seat } from "../service/seat.service";
import { SeatPreview } from "./SeatPreview";

interface Props {
  seats: (Seat | null)[][];
  onSelectSeat: (seat: Seat | null) => void;
}

export function SeatList({ seats, onSelectSeat }: Props) {
  return (
    <ul>
      {seats.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((col, jdx) => (
            <SeatPreview onSelectSeat={onSelectSeat} seat={col} key={jdx} />
          ))}
        </div>
      ))}
    </ul>
  );
}
