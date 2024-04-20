import { Seat } from "../service/seat.service";
import { SeatPreview } from "./SeatPreview";

interface Props {
  seats: (Seat | null)[][];
}

export function SeatList({ seats }: Props) {
  return (
    <ul>
      {seats.map((row, idx) => (
        <li className="row" key={idx}>
          {row.map((col, jdx) => (
            <SeatPreview seat={col} key={jdx} />
          ))}
        </li>
      ))}
    </ul>
  );
}
