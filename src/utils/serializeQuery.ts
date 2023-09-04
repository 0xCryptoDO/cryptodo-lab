export const serializeQuery = (obj: {[k: string]: string})=> {
  const str = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const p in obj)
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)  }=${  encodeURIComponent(obj[p])}`);
    }
  return str.join("&");
}