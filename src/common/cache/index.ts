import { isNull, isUndefined } from 'lodash-es';

export interface CacheEntity<T> {
  value: T;
  start?: number;
  expire?: number;
}

type Value = string | object | number | boolean | null | undefined;
type Key = string;

/**
 * 设置普通KV
 * @param key
 * @param value
 */
export function setValue(key: Key, value: Value) {
  if (isNull(value) || isUndefined(value)) {
    localStorage.setItem(key, '');
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 获取普通KV
 * @param key
 * @returns {any}
 */
export function getValue<T>(key: Key): T | undefined {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

/**
 * 获取 存活的 key对应value
 * @param key
 * @returns {string|any}
 */
export function getAliveValue<T>(key: Key): CacheEntity<T> | undefined {
  if (!isExpire(key)) {
    return getValue<CacheEntity<T>>(key);
  }
}

/**
 * 设置具有有效期的KV，默认有效期为1周
 * @param key
 * @param value
 * @param expire
 */
export function setAliveValue(key: Key, value: Value, expire = 7 * 24 * 60 * 60 * 1000) {
  setValue(key, {
    value,
    start: Date.now().valueOf(),
    expire,
  });
}

/**
 * token 是否有效
 * @returns {boolean}
 */
export function isExpire(key: Key): boolean {
  let isExpire = true;
  const data = getValue<CacheEntity<unknown>>(key);

  if (data && Date.now().valueOf() - data.start! < data.expire!) {
    isExpire = false;
  }
  return isExpire;
}

/**
 * 清除key
 */
export function removeValue(key: Key) {
  localStorage.removeItem(key);
}

/**
 * 清除所有key
 */
export function clearValue() {
  localStorage.clear();
}
