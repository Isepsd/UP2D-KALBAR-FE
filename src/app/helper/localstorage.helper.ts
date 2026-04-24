import { dataEncryption, dataDecryption } from "./security.helper";
import { isJson } from "./data.helper";

export function getItem(key: string, defaultValue:any = null) { 
  try {
    const LsData = localStorage.getItem(key);
    if (LsData === null) return defaultValue;

    if (process.env.ENCODE) {
      return LsData ? dataDecryption(LsData) : null;
    } else {
      return isJson(LsData) ? JSON.parse(LsData) : LsData;
    }
  } catch (error) {
    return defaultValue;
  }
}

export function setItem(key:string, value: any) {
  let data = JSON.stringify(value);

  if (data && process.env.ENCODE) {
    data = dataEncryption(data);
  }

  localStorage.setItem(key, data);
}

export function deleteItem(key: string) {
  localStorage.removeItem(key);
}

export function deleteAll() {
  localStorage.clear();
}
