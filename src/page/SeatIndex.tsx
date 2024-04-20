import { useEffect, useState } from "react";
import { Seat, seatService } from "../service/seat.service";
import { SeatList } from "../cmp/SeatList";

export function SeatIndex() {
  const [seats, setSeats] = useState<(Seat | null)[][]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const theatre = await seatService.fetchTheatre();
      console.log( theatre)
      if (!theatre) throw new Error("fail");
      setSeats(theatre);
    } catch (err) {
      console.error(err);
    }
  };

  const onSelectSeat = async (seat: Seat | null) => {
    console.log("seat:", seat)
    if (!seat) return;
    try {
      seat.isAvailable = !seat.isAvailable;
      const updatedSeat = await seatService.update(seat);
      console.log("updatedSeat:", updatedSeat);
      loadItems();
    } catch (error) {
      console.error(error);
    }
  };

  if (!seats) return <div>...Loading</div>;

  return (
    <div className="container">
      <section className="theatre">
        <h2>Screen is this way</h2>
        <SeatList onSelectSeat={onSelectSeat} seats={seats} />
      </section>
      <div className="seats-type">
        <h3>Available seat</h3>
        <h3>Reserved seat</h3>
        <h3>Selected seat</h3>
      </div>
    </div>
  );
}
