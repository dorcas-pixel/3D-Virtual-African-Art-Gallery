export const getQuery = (key: string) =>
  new URLSearchParams(location.search).get(key);

export const getPath = (url: string) => url.replace(location.origin, "");

export const BASEURL = () => {
  return ['5173', '5174'].includes(location.port) ?
    'http://localhost:3132' :
    ''
}