/** String Helper Title Case  */
export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function truncate(str:string, max:number) {
  return str && str?.length > max ? str.substr(0, max-1) + '…' : str;
}
