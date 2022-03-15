import { isJson } from "./json";
import { buildUrl } from "./url";

/**
 * Build a message for an `Error` using the response data.
 * Text responses will be truncated to the first line of the response.
 * Object responses will be JSON stringified.
 * @param {*} data - the response data
 * @return {string}
 */
function getErrorMessage(data) {
  let msg = "";
  if (typeof data === "string") {
    // First line
    msg = data.match(/^([^\n]+)\n/g)[0].replace(/\n/g, "");
    msg = `"${msg}"`;
  } else if (typeof data === "object") {
    msg = JSON.stringify(data, null, 2);
  } else {
    msg = String(data);
  }

  return msg;
}

/**
 * Build the request and return the fetch promise.
 * See https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
 * @param {string} endpoint - url to fetch
 * @param {any} [body] - optional post body. if present, the method will default to 'POST'
 * @param {object} [params={}] - optional url params. added as params to the endpoint url
 * @param {RequestInit} [customConfig={}] - fetch `config` overrides
 * @param {boolean} [asXhr=true] - if true, x-requested-with header is `XMLHttpRequest`
 * @param {boolean} [asJson=true] - if true, content type will be `application/json` body will be JSON stringified
 * @param {boolean} [withResp=false] - if true, promise resolution will be `[data, response]` instead of `data`
 * @return {Promise<Response>}
 */
function client({
  endpoint,
  body,
  params = {},
  customConfig = {},
  asXhr = true,
  asJson = true,
  withResp = false,
  traditional = false,
}) {
  const headers = {
    Accept: "application/json",
  };

  if (asXhr) headers["X-Requested-With"] = "XMLHttpRequest";
  if (asJson) headers["Content-Type"] = "application/json";

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) config.body = asJson ? JSON.stringify(body) : body;
  config.method = config.method.toUpperCase();

  const url = buildUrl(endpoint, params, traditional);

  return fetch(url, config).then(async (response) => {
    const text = await response.text();
    const isJsonResponse = isJson(response);

    if (isJsonResponse && text.length === 0) return {};

    const data = isJsonResponse ? JSON.parse(text) : text;

    if (response.ok) return withResp ? [data, response] : data;

    // Error Response
    const msg = getErrorMessage(data);
    const error = new Error(msg);
    error.data = data;
    error.response = response;

    return Promise.reject(error);
  });
}

export default client;
