import { useEffect, useState } from "react";
import { Seat, seatService } from "../service/seat.service";
import { SeatList } from "../cmp/SeatList";
import { SeatModal } from "../cmp/SeatModal";

export function SeatIndex() {
  const [seats, setSeats] = useState<(Seat | null)[][]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const theatre = await seatService.fetchTheatre();
      if (!theatre) throw new Error("fail");
      setSeats(theatre);
      setSelectedSeats([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMouseDown = (seat: Seat | null) => {
    if (isMouseDown || !seat || !seat.isAvailable) return;

    setIsMouseDown(true);
    toggleSeatSelection(seat);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setOpen(true);
  };

  const toggleSeatSelection = (seat: Seat | null) => {
    if (!seat || !seat.isAvailable) return;

    const index = selectedSeats.findIndex((s) => s.id === seat.id);
    if (index > -1) {
      setSelectedSeats((current) => current.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats((current) => [...current, seat]);
    }
  };

  const bookSeats = async () => {
    if (!selectedSeats) return;
    selectedSeats.forEach((seat) => (seat.isAvailable = false));
    try {
      await seatService.update(selectedSeats);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      // loadItems();
    }
  };

  if (!seats) return <div>...Loading!!</div>;

  return (
    <div className="container" onMouseUp={handleMouseUp}>
      <section className="theatre">
        <h2>Screen is this way</h2>
        <SeatList
          onSelectSeat={toggleSeatSelection}
          seats={seats}
          onMouseDown={handleMouseDown}
          isMouseDown={isMouseDown}
          selectedSeats={selectedSeats}
        />
      </section>
      <div className="seats-type">
        <h3>Available seat</h3>
        <h3>Reserved seat</h3>
        <h3>Selected seat</h3>
      </div>

      {open && (
        <SeatModal
          setOpen={setOpen}
          seats={selectedSeats}
          bookSeats={bookSeats}
        />
      )}
    </div>
  );
}
