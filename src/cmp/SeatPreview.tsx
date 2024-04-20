import { Seat } from "../service/seat.service";

interface Props {
  seat: Seat | null;
}

export function SeatPreview({ seat }: Props) {
  console.log("seat:", seat)
  const isGap = seat ? "seat" : "gap";
  return <li className={isGap}></li>;
}
