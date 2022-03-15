/** Returns true if this is a json response. */
export function isJson(resp) {
  if (!resp?.getResponseHeader && !resp?.headers) return false;

  try {
    const header = resp.getResponseHeader
      ? resp.getResponseHeader("content-type") // XMLHttpResponse
      : resp.headers.get("content-type"); // Fetch API Response
    return !!header.match(/application\/json/i);
  } catch (err) {
    return false;
  }
}
