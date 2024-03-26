export const getQuery = (key: string) =>
  new URLSearchParams(location.search).get(key);

export const getPath = (url: string) => url.replace(location.origin, "");
