import { storageService } from "./storge.service";
import { makeLorem, make_id } from "./util.service";

export interface ItemModal {
  id: string;
}

export const ITEM_DB = "item_db";

export const itemService = {
  fetchItems,
};

async function fetchItems(): Promise<ItemModal[] | undefined> {
  let items: ItemModal[] = [];
  try {
    items = await storageService.query(ITEM_DB);
    if (!items || items.length <= 0) items = _loadItems();

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

const _loadItems = () => {
  const items: ItemModal[] = [];
  for (let i = 0; i < 20; i++) {
    items.push(_createItem());
  }

  return items;
};

const _createItem = () => {
  const id = make_id();
  return {
    id,
    img: `https://robohash.org/${id}.png`,
    desc: makeLorem(10),
  };
};
