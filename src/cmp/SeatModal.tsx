import { useEffect, useRef, useState } from "react";
import { Seat } from "../service/seat.service";

interface Props {
  seats: Seat[];
  setOpen: (isOpen: boolean) => void;
  bookSeats: (seats: Seat[]) => void;
  setSelectedSeats: (seats: Seat[]) => void;
}

export function SeatModal({
  seats,
  setOpen,
  bookSeats,
  setSelectedSeats,
}: Props) {
  console.log("seats:", seats);
  const modalRef = useRef<HTMLDivElement>(null);

  const [countdown, setCountdown] = useState(10);
  const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);

  useEffect(() => {
    const timeoutId = setTimeout(timeOver, 10000); // Set timeout for 10 seconds
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const timeOver = () => {
    setSelectedSeats([]);
    setOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <section ref={modalRef} className="modal">
      <div>Time remaining: {countdown}</div>
      <ul>
        {seats.map((seat) => (
          <li key={seat.id}>
            <h4>Price: {seat.price}$</h4>
            <h5>Row: {seat.id.substring(0, 2)}</h5>
            <h5>Column: {seat.id.substring(2)}</h5>
          </li>
        ))}
      </ul>
      <h2>Total: {totalPrice}$</h2>
      <button onClick={() => bookSeats(seats)}>Book</button>
    </section>
  );
}
