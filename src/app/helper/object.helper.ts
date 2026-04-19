import { isArray, isObject, replace } from 'lodash';
import { JSONtoString } from './data.helper';

export function getObjectKeys(obj: any) {
  const keys: any = [];
  if (obj) {
    Object.keys(obj)?.map((field: string) => {
      keys.push(field);
    });
  }

  return keys;
}
export function removeEmptyObject(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(
        ([k, v]) =>
          v != '' &&
          v != undefined &&
          k != 'createdAt' &&
          k != 'updatedAt' &&
          k != 'cover'
      )
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyObject(v) : v])
  );
}

export function cleanParamsRequest(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([k]) => k != 'createdAt' && k != 'updatedAt' && k != 'agreement')
      .map(([k, v]) => [
        k,
        v === Array.isArray(v)
          ? JSONtoString(v)
          : Array.isArray(v)
          ? JSONtoString(v)
          : v,
      ])
  );
}

export const getMenuNested = (menus: any) => {
  const result = menus.filter(function (item: any) {
    item.children = menus.filter(function (itemsub: any) {
      return itemsub.parent_id === item.id;
    });
    return item.parent_id === '' || item.parent_id === undefined;
  });

  return result;
};
export const uniqueObject = ({ data, key }: any) => {
  let flags = [];
  let result = [];
  let l = data.length;
  let i;
  for (i = 0; i < l; i++) {
    if (flags[data[i][key]]) continue;
    flags[data[i][key]] = true;
    result.push(data[i]);
  }

  return result;
};

export const renameObjectProp = (
  oldProp: string,
  newProp: string,
  { [oldProp]: old, ...others }
) => {
  return {
    [newProp]: old,
    ...others,
  };
};

const changeString = (s: any, search:string, replaced:string) => replace(s,new RegExp(search,"g"),replaced)
;

export const objectKeyChanger: any = (o: any, search:string, replaced:string) => {
  if (isObject(o)) {
    return Object.entries(o).reduce(
      (acc, [k, v]) => ({ ...acc, [changeString(k, search, replaced)]: objectKeyChanger(v) }),
      {}
    );
  } else if (isArray(o)) {
    return o.map((i: any) => objectKeyChanger(i));
  }

  return o;
};
