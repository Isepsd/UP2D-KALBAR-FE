export function numberCurrencyID(value: any) {
  return `Rp. ${(parseFloat(value) || 0).toLocaleString('id-ID')}`;
}
export function formatThousand(value: any) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID')}`;
}
export function formatPercentage(value: any) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID', {
    minimumFractionDigits: 2,
  })}`;
}

export const decimalNumberFormat = (number: any, afterComma: number = 1) => {
  return number ? number.toFixed(afterComma) : 0;
};

export function localeFormatter(data: any) {
  data = parseFloat(data);
  return data ? data.toLocaleString('id-ID') : 0; //, { style: 'currency', currency: 'IDR' }
}

export function kFormatterNumber(num: any) {
  return num
    ? Math.abs(num) > 999
      ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1) as any) + 'k'
      : Math.sign(num) * Math.abs(num)
    : 0;
}

export function addLeadingZeros(num: number, totalLength: number): string {
  return String(num).padStart(totalLength, '0');
}
