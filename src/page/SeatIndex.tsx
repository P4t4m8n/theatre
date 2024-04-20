import { useEffect, useState } from "react";
import { Seat, SeatService } from "../service/seat.service";
import { SeatList } from "../cmp/SeatList";

export function SeatIndex() {
  const [seats, setSeats] = useState<(Seat | null)[][]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const theatre = await SeatService.fetchTheatre();
      if (!theatre) throw new Error("fail");
      setSeats(theatre);
    } catch (err) {
      console.error(err);
    }
  };

  if (!seats) return <div>...Loading</div>;

  return (
    <div className="container">
      <section className="theatre">
        <h2>Screen is this way</h2>
        <SeatList seats={seats} />
      </section>
      <div className="seats-type">
        <h3>Available seat</h3>
        <h3>Reserved seat</h3>
        <h3>Selected seat</h3>
      </div>
    </div>
  );
}
