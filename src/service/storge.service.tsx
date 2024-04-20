import { make_id } from "./util.service";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  make_id,
  save
};

interface Entity_id {
  _id: string;
}

async function query<T>(entityType: string, delay = 100): Promise<T[]> {
  const entities = JSON.parse(localStorage.getItem(entityType) || "null") || [];
  if (delay) {
    return new Promise((resolve) => setTimeout(resolve, delay, entities));
  }
  return entities;
}

async function get<T extends Entity_id>(
  entityType: string,
  entity_id: string
): Promise<T> {
  const entities = await query<T>(entityType);
  const entity = entities.find((entity) => entity._id === entity_id);
  if (!entity)
    throw new Error(
      `Cannot get, Item ${entity_id} of type: ${entityType} does not exist`
    );
  return entity;
}

async function post<T>(entityType: string, newEntity: T): Promise<T> {
  newEntity = { ...newEntity, _id: make_id() };
  const entities = await query<T>(entityType);
  entities.push(newEntity);
  save(entityType, entities);
  return newEntity;
}

async function put<T extends Entity_id>(
  entityType: string,
  updatedEntity: T
): Promise<T> {
  const entities = await query<T>(entityType);
  const _idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
  entities[_idx] = updatedEntity;
  save(entityType, entities);
  return updatedEntity;
}

async function remove<T extends Entity_id>(
  entityType: string,
  entity_id: string
): Promise<void> {
  const entities = await query<T>(entityType);
  const _idx = entities.findIndex((entity) => entity._id === entity_id);
  if (_idx !== -1) entities.splice(_idx, 1);
  else
    throw new Error(
      `Cannot remove, item ${entity_id} of type: ${entityType} does not exist`
    );
  save(entityType, entities);
}

function save<T>(entityType: string, entities: T[]) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}


