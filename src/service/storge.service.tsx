import { makeId } from "./util.service";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  save,
};

interface EntityId {
  id: string;
}

async function query<T>(entityType: string, delay = 100): Promise<T[]> {
  const entities = JSON.parse(localStorage.getItem(entityType) || "null") || [];
  if (delay) {
    return new Promise((resolve) => setTimeout(resolve, delay, entities));
  }
  return entities;
}

async function get<T extends EntityId>(
  entityType: string,
  entityId: string
): Promise<T> {
  const entities = await query<T>(entityType);
  const entity = entities.find((entity) => entity.id === entityId);
  if (!entity)
    throw new Error(
      `Cannot get, Item ${entityId} of type: ${entityType} does not exist`
    );
  return entity;
}

async function post<T>(entityType: string, newEntity: T): Promise<T> {
  newEntity = { ...newEntity, id: makeId() };
  const entities = await query<T>(entityType);
  entities.push(newEntity);
  save(entityType, entities);
  return newEntity;
}

async function put<T extends EntityId>(
  entityType: string,
  updatedEntity: T
): Promise<T> {
  const entities = await query<T[]>(entityType);
  for (let i = 0; i < entities.length; i++)
    for (let j = 0; j < entities.length; j++) {
      if (!entities[i][j]) continue;
      if (entities[i][j].id === updatedEntity.id) {
        entities[i][j] = updatedEntity;
        save(entityType, entities);
      }
    }
  return updatedEntity;
}

async function remove<T extends EntityId>(
  entityType: string,
  entityId: string
): Promise<void> {
  const entities = await query<T>(entityType);
  const idx = entities.findIndex((entity) => entity.id === entityId);
  if (idx !== -1) entities.splice(idx, 1);
  else
    throw new Error(
      `Cannot remove, item ${entityId} of type: ${entityType} does not exist`
    );
  save(entityType, entities);
}

function save<T>(entityType: string, entities: T[]) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
