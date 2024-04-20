import { faker } from "@faker-js/faker";
import { storageService } from "./storge.service";

interface LayoutCell {
  start: number;
  end: number;
  gap: number[];
}

export interface Seat {
  loc: string;
  price: number;
  isAvailable: boolean;
}

export const SEAT = "seat";
const THEATRE_DB = "theatre_db";

export const SeatService = {
  fetchTheatre,
};

async function fetchTheatre(): Promise<(Seat | null)[][] | undefined> {
  let theatre: (Seat | null)[][] = [];
  try {
    theatre = await storageService.query(THEATRE_DB);
    if (!theatre || theatre.length <= 0) theatre = _createTheatre();

    return theatre;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

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
        loc: idx.toString().padStart(2, "0") + i.toString().padStart(2, "0"),
        price: parseFloat(faker.commerce.price()),
        isAvailable: true,
      });
  }

  layoutCell.gap.forEach((idx) => (row[idx] = null));

  return row;
}
