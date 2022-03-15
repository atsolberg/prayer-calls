/** Retrieve a request parameter by name. */
export function getUrlParam(name, url = window.location.href) {
  const sanitizedName = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regexS = `[\\?&]${sanitizedName}=([^&#]*)`;
  const results = new RegExp(regexS, "i").exec(url);

  if (results === null) {
    return null;
  }
  return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/** Return true if the query string has the parameter. */
export function hasUrlParam(name, url = window.location) {
  const params = url.search
    .split(/[&?]/g)
    .filter((param) => Boolean(param))
    .map((param) => param.split("=")[0].toLowerCase());

  return params.includes(name.toLowerCase());
}

/** Add url search params to url */
export function buildUrl(endpoint, params = {}, traditional) {
  const isFullUrl = !endpoint.startsWith("/");

  const url = isFullUrl
    ? new URL(endpoint)
    : new URL(endpoint, window.location.origin);

  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v) && traditional) {
      v.forEach((item) => url.searchParams.append(k, item));
    } else {
      url.searchParams.append(k, v);
    }
  });

  return url.href;
}

export function setUrlHash(hash) {
  const url = new URL(window.location);
  url.hash = hash;
  window.history.pushState({}, "", url);
}
