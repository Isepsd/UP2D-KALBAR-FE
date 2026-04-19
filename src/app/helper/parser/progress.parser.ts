import { capitalize, get, isArray } from "lodash";
import { formatThousand } from "../number.helper";

export const progressNumberParser = (
  items: any,
  formatterValue: any = undefined,
  name = 'name',
  value = 'value',
  max = 0
) => {
  if (isArray(items)) {
    // const percentage = (v: any) => {
    //   const total = items?.reduce(
    //     (acc: any, array: any) => acc + array[value],
    //     0
    //   );
    //   return (v / total) * 100;
    // };
    // console.log("items", items);


    return items
      ?.map((i: any) => {
        return {
          ...i,
          realValue: get(i, value),
          name: capitalize(get(i, name)),
          width: max ? (get(i, value) / max * 100) : get(i, value),
          // percentage: decimalNumberFormat(percentage(get(i, value)), 1),
          value: formatterValue
            ? formatterValue(get(i, value))
            : formatThousand(get(i, value)),
          value2: get(i, value) ? get(i, value) : 0,
        };
      })
      .sort(function (a: any, b: any) {
        return parseFloat(b.value2) - parseFloat(a.value2);
      });
  } else {
    return []
  }

};
