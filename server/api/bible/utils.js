export function logError(msg, res = {}) {
  const { isAxiosError } = res;
  if (isAxiosError) {
    // Error response from 3rd party
    const json = res?.toJSON() || {};
    console.log("Error", json.message, "Status", json.status);
  } else {
    console.log(msg, res);
  }
}

/**
 * Handle a failed request to a 3rd party
 * @param {string} msg - An error message to log
 * @param {Error} apiRes - Either a js error or an axios error
 * @param {Response} res - The express http response object
 * @return {Response}
 */
export function handleApiError(msg, apiRes = {}, res) {
  logError("Error fetching bible list", apiRes);

  const { isAxiosError } = apiRes;
  let status = 500;
  let message = apiRes.message;
  let data = {};

  if (isAxiosError) {
    const json = apiRes.toJSON();
    status = json.status;
    message = json.message;
    data = apiRes?.response?.data || {};
  }
  res.status(status).json({ message: message || "", data });
  return res;
}
