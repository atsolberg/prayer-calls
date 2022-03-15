/**
 * Module to abstract the console.
 * Performs the log only if
 * - the environment has a console,
 * - with the desired log function
 */

const logger = {};
const g = global || window;

[
  "assert",
  "dir",
  "count",
  "log",
  "info",
  "debug",
  "warn",
  "error",
  "table",
  "trace",
  "group",
  "groupEnd",
  "groupCollapsed",
  "profile",
  "profileEnd",
  "time",
  "timeEnd",
  "timeStamp",
].forEach((key) => {
  const isLoggable = g.console && g.console[key];

  logger[key] = isLoggable
    ? function log(...args) {
        g.console[key](...args);
      }
    : () => {};
});

export default logger;
