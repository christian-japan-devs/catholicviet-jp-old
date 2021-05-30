type Key = string;
/**
 * Register an item via key and value in local storage
 * @param  {Key} key
 * @param  {any} data
 * @returns {any} retrun
 */
export function store(key: Key, data: any, storage = window.localStorage) {
  if (!window.localStorage || !key) {
    return;
  }
  storage.setItem(key, JSON.stringify(data));
}
/**
 * Get an item in local storage db
 * @param  {Key} key
 * @returns {Read<any>}
 */
export function read(key: Key, storage = window.localStorage): unknown {
  if (!storage || !key) {
    return;
  }
  const item: any = storage.getItem(key);
  if (!item) {
    return;
  }

  try {
    return JSON.parse(item);
  } catch (error) {
    return JSON.parse(`"${item}"`);
  }
}
/**
 * Remove an item in local storage db
 * @param  {Key} key
 * @returns {any}
 */
export function remove(key: Key, storage = window.localStorage) {
  if (!storage || !key) {
    return;
  }

  storage.removeItem(key);
}
