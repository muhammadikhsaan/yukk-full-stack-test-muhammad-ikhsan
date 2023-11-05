export const getQueryString = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
}

export const setUrl = (path, query = {}) => {
  const url = new URL(path);

  for (const key in query) {
    query[key] ? url.searchParams.set(key, query[key]) : url.searchParams.delete(key);
  }

  return url;
}