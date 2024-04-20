import { useEffect, useRef } from "react";
import { Seat } from "../service/seat.service";

interface Props {
  seats: Seat[];
  setOpen: (isOpen: boolean) => void;
  bookSeats: (seats: Seat[]) => void;
}
export function SeatModal({ seats, setOpen, bookSeats }: Props) {
  console.log("seats:", seats);
  const modalRef = useRef<HTMLDivElement>(null);
  const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  if (!seats || seats.length <= 0) return <div>...Loading</div>;
  return (
    <section ref={modalRef} className="modal">
      <ul>
        {seats.map((seat) => (
          <li key={seat.id}>
            <h4>Price: {seat.price + "$"}</h4>
            <h5>Row: {seat.id.substring(0, 2)}</h5>
            <h5>Column: {seat.id.substring(2)}</h5>
          </li>
        ))}
      </ul>
      <h2>Total: {totalPrice + "$"}</h2>
      <button onClick={() => bookSeats(seats)}>Book</button>
    </section>
  );
}
