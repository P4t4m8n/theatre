import { faker } from "@faker-js/faker";
import { storageService } from "./storge.service";

interface LayoutCell {
  start: number;
  end: number;
  gap: number[];
}

export interface Seat {
  id: string;
  price: number;
  isAvailable: boolean;
}

export const SEAT = "seat";
const THEATRE_DB = "theatre_db";

export const seatService = {
  fetchTheatre,
  update,
};

async function fetchTheatre(): Promise<(Seat | null)[][] | undefined> {
  let theatre: (Seat | null)[][] = [];
  try {
    theatre = await storageService.query(THEATRE_DB);
    if (!theatre || theatre.length <= 0) {
      theatre = _createTheatre();
    }

    return theatre;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

async function update(seats: Seat[]): Promise<(Seat | null)[][] | undefined> {
  try {
    const theatre = await fetchTheatre();
    if (!theatre) throw new Error();
    seats.forEach((seat) => {
      const coords = _stringToCoords(seat.id);
      theatre[coords.i][coords.j] = seat;
    });
    _save(THEATRE_DB, theatre);
    return theatre;
  } catch (error) {
    console.error(error);
  }
}

function _save<T>(entityType: string, entities: T[]) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

const _stringToCoords = (input: string) => {
  const str = input.trim();
  const midIndex = Math.floor(str.length / 2);
  const i = parseInt(input.substring(0, midIndex), 10);
  const j = parseInt(input.substring(midIndex), 10);

  return { i, j };
};

export const _createTheatre = () => {
  const layout = [
    {
      start: 4,
      end: 24,
      gap: [7, 20],
    },
    {
      start: 4,
      end: 24,
      gap: [7, 20],
    },
    {
      start: 3,
      end: 25,
      gap: [7, 20],
    },
    {
      start: 3,
      end: 26,
      gap: [7, 20],
    },
    {
      start: 2,
      end: 27,
      gap: [7, 20],
    },
    {
      start: 1,
      end: 28,
      gap: [7, 20],
    },
    {
      start: 1,
      end: 28,
      gap: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      start: 0,
      end: 28,
      gap: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      start: 21,
      end: 28,
      gap: [],
    },
  ];
  const theatre = layout.map((row, idx) => {
    return _createRow(row, idx);
  });
  storageService.save(THEATRE_DB, theatre);
  return theatre;
};

function _createRow(layoutCell: LayoutCell, idx: number): (Seat | null)[] {
  const row = [];
  for (let i = 0; i < 28; i++) {
    if (i < layoutCell.start) row.push(null);
    else if (i > layoutCell.end) row.push(null);
    else
      row.push({
        id: idx.toString().padStart(2, "0") + i.toString().padStart(2, "0"),
        price: parseFloat(faker.commerce.price()),
        isAvailable: true,
      });
  }

  layoutCell.gap.forEach((idx) => (row[idx] = null));

  return row;
}
