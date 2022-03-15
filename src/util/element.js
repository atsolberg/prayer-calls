import { css as ccss, styles } from "./constants";
import logger from "./logger";
import { camelCase, isString } from "./string";

const g = global || window;

/* Utilities
   --------------------------------------------------------------- */

/** Returns true if this is a dom element */
export function isElement(node) {
  return !!node?.nodeType;
}

/** Returns target if it is an element or attempts to find it via query selector */
export function getElement(target, container) {
  if (target === g || isElement(target)) return target;
  const within = !container ? document : getElement(container);
  return within.querySelector(target);
}
const q = getElement;
g.q = q;
q.isElement = isElement;
q.getElement = getElement;

/**
 * Get element by id
 * @param {string} id - the id of the element to find
 * @returns {HTMLElement|undefined}
 */
export function gebi(id) {
  return document.getElementById(id);
}
q.gebi = gebi;

/**
 * Returns selected elements as an array
 * If two arguments, the first one is assumed to be the node to query.
 * @return {HTMLElement[]}
 */
export function qsa(...args) {
  const node = args.length === 2 ? args[0] : document;
  const selector = args.length === 2 ? args[1] : args[0];
  return Array.from(node.querySelectorAll(selector));
}
q.qsa = qsa;

/**
 * Find and element by query selector
 * If two arguments, the first one is assumed to be the node to query.
 * @return {HTMLElement|undefined}
 */
export function qs(...args) {
  const node = args.length === 2 ? args[0] : document;
  const selector = args.length === 2 ? args[1] : args[0];
  return node.querySelector(selector);
}
q.qs = qs;

/**
 * Find the closest ancestor matching the selector
 * Replaces $(selector).closest
 * @return {HTMLElement|undefined}
 */
export function closest(target, selector) {
  let element = getElement(target);
  const matchesSelector =
    element.matches ||
    element.webkitMatchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector;

  while (element) {
    if (matchesSelector.call(element, selector)) return element;
    element = element.parentElement;
  }

  return null;
}
q.closest = closest;

/** Add a class(es) to an element */
export function addClass(target, className = "") {
  const classes = className.trim().split(" ");
  const element = getElement(target);
  classes.forEach((c) => {
    if (element) element.classList.add(c);
  });
  return element;
}
q.addClass = addClass;

/** Remove a class from an element */
export function removeClass(target, className = "") {
  const classes = className.trim().split(" ");
  const element = getElement(target);
  classes.forEach((c) => {
    if (element) element.classList.remove(c);
  });
  return element;
}
q.removeClass = removeClass;

/** Add an element after a target */
export function after(target, element) {
  getElement(target).insertAdjacentElement("afterend", element);
}
q.after = after;

/** Add an element before a target */
export function before(target, element) {
  getElement(target).insertAdjacentElement("beforebegin", element);
}
q.before = before;

/** Append an element to a parent */
export function append(target, element) {
  getElement(target).appendChild(element);
}
q.append = append;

/** Prepend an element to a parent */
export function prepend(target, element) {
  const parent = getElement(target);
  const elem = isString(element) ? create(element) : element;
  parent.insertBefore(elem, parent.firstChild);
}
q.prepend = prepend;

/** Is the target a child of the parent */
export function contains(parent, child) {
  const p = getElement(parent);
  const c = getElement(child);
  return p !== c && p.contains(c);
}
q.contains = contains;

/** Remove an element */
export function remove(target) {
  const element = getElement(target);
  element.parentNode.removeChild(element);
}
q.remove = remove;

/**
 * Get or set a css property on an element
 * @param {string|node} target - the target element or css selector to it
 * @param {string} ruleName - the js version (camelCase) of the css property name
 * @param {string} [value] - if provide, the css property is set to this value
 * @return {string|node} the node when setting a value, the value when getting a value
 */
export function css(target, ruleName, value) {
  const rule = camelCase(ruleName);
  const element = getElement(target);

  if (typeof value !== "undefined") {
    // Set a css value
    element.style[rule] = value;
    return element;
  }

  // get a css value
  const win = element.ownerDocument.defaultView;
  return win.getComputedStyle(element)[rule];
}
q.css = css;

/**
 * Get or set the text content of an element
 * @param {string|node} target - the target element or css selector to it
 * @param {string} [value] - if provide, the text context is set to this value
 * @return {string|node} the node when the text content is being set, otherwise the text content
 */
export function text(target, value) {
  const element = getElement(target);
  if (typeof value === "undefined") return element.textContent || "";

  element.textContent = value;
  return element;
}
q.text = text;

/**
 * Get or set the inner html of an element
 * Replaces $('.foo').html
 * @param {string|node} target - the target element or css selector to it
 * @param {string} [value] - if provide, the inner html is set to this value
 * @return {string|node} the node when the inner html is being set, otherwise the text content
 */
export function html(target, value) {
  const element = getElement(target);
  if (typeof value === "undefined") return element.innerHTML;

  element.innerHTML = value;
  return element;
}
q.html = html;

/**
 * Create an html document fragment from html text.
 * Replaces $('<div class="foo">bar</div>');
 * @param {string} html - the html text, i.e. "<div>foo</div>" or "<button>"
 * @return {DocumentFragment|Element} the element if only one was created or the fragment
 */
export function create(html) {
  const range = document.createRange();
  const parse = range.createContextualFragment.bind(range);
  const fragment = parse(html);

  if (fragment.childElementCount === 1) return fragment.childNodes[0];
  return fragment;
}
q.create = create;

/** Return the text content of an element */
export function hasClass(target, className) {
  const elem = getElement(target);
  return elem && elem.classList.contains(className);
}
q.hasClass = hasClass;

/**
 * Adds or removes a class from an element
 * @param {string|node} target
 * @param {string} className
 * @param {boolean} [condition] - if present class is added/removed based on this
 */
export function toggleClass(target, className = "", condition) {
  const hasCond = typeof condition !== "undefined";
  const element = getElement(target);
  const classes = className.trim().split(" ");

  classes.forEach((c) => {
    if (hasCond) {
      if (condition) element.classList.add(c);
      else element.classList.remove(c);
    } else {
      element.classList.toggle(c);
    }
  });

  return element;
}
q.toggleClass = toggleClass;

/** Return the index of an element within it's parents child list */
export function index(target) {
  let index = -1;
  const element = getElement(target);
  if (!element) return index;

  Array.from(getElement(element.parentElement).children).forEach((c, i) => {
    if (c === element) index = i;
  });

  return index;
}
q.index = index;

/** Returns true if the target matches the selector */
export function is(target, selector) {
  const element = getElement(target);
  return (
    element.matches ||
    element.matchesSelector ||
    element.msMatchesSelector ||
    element.mozMatchesSelector ||
    element.webkitMatchesSelector ||
    element.oMatchesSelector
  ).call(element, selector);
}
q.is = is;

/** Returns the element immediately after this one */
export function next(target) {
  return getElement(target).nextElementSibling;
}
q.next = next;

/** Returns all elements after this one */
export function nextAll(elem, filter) {
  const siblings = [];
  let nextElem = elem.parentNode.firstChild;
  // eslint-disable-next-line no-cond-assign
  do {
    // eslint-disable-next-line no-continue
    if (nextElem.nodeType === 3) continue; // ignore text nodes
    // eslint-disable-next-line no-continue
    if (nextElem === elem) continue; // ignore elem of target
    if (nextElem === elem.nextElementSibling) {
      if (!filter || filter(elem)) {
        siblings.push(nextElem);
        elem = nextElem;
      }
    }
  } while ((nextElem = nextElem.nextSibling));
  return siblings;
}
q.nextAll = nextAll;

/** Returns the element immediately before this one */
export function prev(target) {
  return getElement(target).previousElementSibling;
}
q.prev = prev;

/** Returns all elements before this one */
export function prevAll(elem, filter) {
  const siblings = [];
  let current = elem;
  // eslint-disable-next-line no-cond-assign
  while ((current = current.previousSibling)) {
    // eslint-disable-next-line no-continue
    if (current.nodeType === 3) continue; // ignore text nodes
    if (!filter || filter(current)) siblings.push(current);
  }
  return siblings;
}
q.prevAll = prevAll;

/** Returns the sibling elements of an element */
export function siblings(target) {
  const element = getElement(target);
  return Array.from(element.parentNode.children).filter((el) => el !== element);
}
q.siblings = siblings;

/**
 * Returns the top and left offsets of this element relative to the document
 * Replaces $.offset()
 * @param {HTMLElement|string} target
 */
export function offset(target) {
  const node = getElement(target);
  const rect = node.getBoundingClientRect();

  return {
    node,
    top: rect.top + window.pageYOffset - document.documentElement.clientTop,
    left: rect.left + window.pageXOffset - document.documentElement.clientLeft,
  };
}
q.offset = offset;

/** Replaces $(window).scrollTop() */
export function scrollTop(target = window) {
  if (target === window) {
    return (
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0)
    );
  }
  const container = getElement(target);
  return container.scrollTop;
}
q.scrollTop = scrollTop;

/** Replaces $(window).scrollLeft() */
export function scrollLeft(target = window) {
  if (target === window) {
    return (
      (window.pageXOffset || document.documentElement.scrollLeft) -
      (document.documentElement.clientLeft || 0)
    );
  }
  const container = getElement(target);
  return container.scrollLeft;
}
q.scrollLeft = scrollLeft;

/**
 * Returns the outer height of the element
 * @param {string|node} target - the element to measure or css selector to it
 * @param {boolean} [includeMargin=false] - if true, measurement will include margin
 * @return {number}
 */
export function outerHeight(target, includeMargin = false) {
  const element = getElement(target);
  let height = element.offsetHeight;
  if (!includeMargin) return height;

  const style = getComputedStyle(element);

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
q.outerHeight = outerHeight;

/**
 * Returns the outer width of the element
 * @param {string|node} target - the element to measure
 * @param {boolean} [includeMargin=false] - if true, measurement will include margin
 * @return {number}
 */
export function outerWidth(target, includeMargin = false) {
  const element = getElement(target);
  let width = element.offsetWidth;
  if (!includeMargin) return width;

  const style = getComputedStyle(element);

  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
q.outerWidth = outerWidth;

/** Return the offset position of this element */
export function position(target) {
  const element = getElement(target);
  return {
    top: element.offsetTop,
    left: element.offsetLeft,
  };
}
q.position = position;

/**
 * Get or set the height of an element
 * @param {string|node} target - the target element or css selector to it
 * @param {function|string|number} [value] - function, string, or number to set the height to
 * @returns {number|node} the height when not setting a value, the element when setting a value
 */
export function height(target, value) {
  const element = getElement(target);
  if (!value) return element.offsetHeight;

  const val = typeof value === "function" ? value() : value;

  if (typeof val === "string") element.style.height = val;
  else element.style.height = `${val}px`;

  return element;
}
q.height = height;

/**
 * Get or set the width of an element
 * @param {string|node} target - the element to adjust
 * @param {function|string|number} [value] - function, string, or number to set the width to
 * @returns {number|node} the width when not setting a value, the element when setting a value
 */
export function width(target, value) {
  const element = getElement(target);
  if (!value) return element.offsetWidth;

  const val = typeof value === "function" ? value() : value;

  if (typeof val === "string") element.style.width = val;
  else element.style.width = `${val}px`;

  return element;
}
q.width = width;

/**
 * Returns the node plus the left, right, width, and height measurements of an element
 * @param {string|node} target - the element to measure
 * @return {{
 *   node: node,
 *   left: number,
 *   width: number,
 *   right: number,
 *   height: number
 * }}
 */
export function getMeasurement(target) {
  const node = getElement(target);
  return {
    node,
    left: node.offsetLeft,
    right: node.offsetLeft + node.clientWidth,
    width: node.clientWidth,
    height: node.clientHeight,
  };
}
q.getMeasurement = getMeasurement;

/**
 * Returns the measurements of all children in a container.
 * @param {string|node} target - the element whose children we are measuring
 * @return {[{
 *   index: number,
 *   node: node,
 *   left: number,
 *   width: number,
 *   right: number,
 *   height: number
 * }]}
 */
export function getChildMeasurements(target) {
  const container = getElement(target);
  if (!container?.childNodes) return {};

  return Array.from(container.childNodes).map((node, i) => ({
    index: i,
    ...getMeasurement(node),
  }));
}
q.getChildMeasurements = getChildMeasurements;

/**
 * Returns true if the element is in the viewport.
 * @param {node} elem - the element in question
 * @param {number} [offset] - optional offset, i.e. use to determine half in viewport
 * @return {boolean}
 */
export function isElementInViewport(elem, offset = 0) {
  // Handle elements that are wrapped by jQuery
  const el = getElement(elem);

  if (!el || !el.getBoundingClientRect) return false;
  const rect = el.getBoundingClientRect();

  return (
    rect.top + offset >= 0 &&
    rect.left >= 0 &&
    rect.bottom - offset <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
q.isElementInViewport = isElementInViewport;

export function isElementAboveViewport(elem) {
  // Handle elements that are wrapped by jQuery
  const el = getElement(elem);

  if (!el || !el.getBoundingClientRect) return false;
  const rect = el.getBoundingClientRect();

  return rect.bottom < 0;
}
q.isElementAboveViewport = isElementAboveViewport;

/** Return true if this element is visible, by checking offset parents up the tree */
export function isNotHidden(target) {
  const el = getElement(target);
  if (!el) return false;

  let current = el.offsetParent;
  if (!current) return false;

  while (current) {
    if (!current.offsetParent) return false;
    current = current.offsetParent;
    if (current === document.body) break;
  }

  return true;
}
q.isNotHidden = isNotHidden;

/* Events
   --------------------------------------------------------------- */

/**
 * @typedef Listener
 * @property {function} cb - the event handler callback function
 * @property {string} filter - css selector for event target filters i.e. 'input, .btn'
 * @property {*} opts - any options passed to `addEventHandler`
 * @property {boolean} log - should this particular event be logged
 */

/**
 * Add a set of event listeners to a dom element.
 * A listener can be a function or an array of [function, options object].
 * @param {node|string} target - the dom element or css selector to add listeners to
 * @param {Object.<string, function|Listener>} listeners - events keyed to listener functions
 * @param {boolean} log - if true, events are logged to the console
 *
 * Examples:
 * // Single with logging
 * const remove = q.addListeners('#foo', { click: myClickHandler }, true);
 * remove();
 *
 * // Multiple with logging
 * const remove = q.addListeners(elem, {
 *   click: myClickHandler,
 *   touch: myTouchHandler,
 * }, true);
 * remove();
 *
 * // With specific event listener options and per event logging
 * const remove = q.addListeners(window, {
 *   click: {
 *     cb: myClickHandler,
 *     log: true,
 *     opts: { passive: false, once: true }
 *   }
 * });
 * remove();
 *
 * // With filtering, only listen for clicks on inputs or .btn elements
 * const remove = q.addListeners(document, {
 *   click: {
 *     cb: myClickHandler,
 *     filter: 'input, .btn'
 *   }
 * });
 * remove();
 */
export function addListeners(target, listeners, log) {
  const element = getElement(target);
  const grouper = logger.groupCollapsed || logger.info;
  const groupend = logger.groupEnd || function noop() {};
  const { label, orange } = styles;
  const consoleStyles = [`${label}`, `${orange}`, `${label}`];

  const removes = [];
  Object.entries(listeners).forEach(([event, listener]) => {
    const hasOptions = typeof listener === "object";
    const cb = hasOptions ? listener.cb : listener;
    const options = hasOptions ? listener.opts : undefined;
    const logThis = hasOptions ? listener.log : false;
    const filters = hasOptions ? listener.filter : undefined;

    const handler = (...args) => {
      const [e] = args;
      if (!filters || !!closest(e.target, filters)) {
        if (log || logThis) {
          const msg = `%cFiring listener for "%c${event}%c"`;
          grouper.apply(console, [msg, ...consoleStyles]);
          logger.info(`%cCallback`, `${ccss.orange}`, cb);
          logger.info(`%cEvent`, `${ccss.orange}`, ...args);
          groupend();
        }
        cb(...args);
      }
    };

    if (event.trim().includes(" ")) {
      // register for multiple events
      const events = event.trim().split(" ");
      events.forEach((e) => {
        element.addEventListener(e, handler, options);
        // Add the args we need to call `removeEventListener`
        removes.push([e, handler, options].filter(Boolean));
      });
    } else {
      // single event
      element.addEventListener(event, handler, options);
      // Add the args we need to call `removeEventListener`
      removes.push([event, handler, options].filter(Boolean));
    }
  });

  return function remove() {
    removes.forEach((r) => element.removeEventListener(...r));
  };
}
q.addListeners = addListeners;

/**
 * Remove a set of event listeners to a dom element
 * @param {Node} el - the dom element to remove listeners from
 * @param {Object.<string, function>} listeners - events keyed to listener functions
 */
export function removeListeners(el, listeners) {
  Object.entries(listeners).forEach(([event, listener]) => {
    el.removeEventListener(event, listener);
  });
}
q.removeListeners = removeListeners;

/** Replaces $(document).ready(eventHandler); and the shorthand $(eventHandler); */
export function ready(callback) {
  if (document.readyState !== "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}
q.ready = ready;

/**
 * Trigger an event on a target
 * @param {string|node} target - target of event
 * @param {string} type - the event type
 * @param {*} [data] - optional data to pass along with the event
 */
export function trigger({ target, type, data, custom = false }) {
  let event;
  const element = getElement(target);
  if (custom) {
    // Build custom event
    if (window.CustomEvent && typeof window.CustomEvent === "function") {
      event = new CustomEvent(type, data ? { detail: data } : undefined);
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, data || undefined);
    }
  } else {
    // Build native event
    event = document.createEvent("HTMLEvents");
    event.initEvent(type, true, false);
  }

  element.dispatchEvent(event);
}
q.trigger = trigger;

/* Animation
   --------------------------------------------------------------- */
/** Replaces $el.animate({ 'height', '40px' }, 300ms); */
export function animate(target, params, ms) {
  const element = getElement(target);
  element.style.transition = `all ${ms}ms`;
  Object.keys(params).forEach((key) => (element.style[key] = params[key]));
}
q.animate = animate;

/** Replaces $el.hide() */
export function hide(target) {
  getElement(target).style.display = "none";
}
q.hide = hide;

/** Replaces $el.show() */
export function show(target) {
  getElement(target).style.display = "";
}
q.show = show;

/** Replaces $el.toggle() */
export function toggle(target) {
  const element = getElement(target);
  const win = element.ownerDocument.defaultView;
  if (win.getComputedStyle(element, null).display === "none") {
    element.style.display =
      // eslint-disable-next-line no-bitwise
      "" | "inline" | "inline-block" | "inline-table" | "block";
  } else {
    element.style.display = "none";
  }
}
q.toggle = toggle;

/** Replaces $el.fadeOut(3000) */
export function fadeOut(target, ms) {
  const element = getElement(target);
  if (ms) {
    const originalTrans = element.style.transition || "";
    element.style.opacity = "1";
    element.style.transition = `opacity ${ms}ms`;
    const end = () => {
      element.style.display = "none";
      element.style.transition = originalTrans;
    };
    element.addEventListener("transitionend", end, {
      once: true,
      capture: false,
    });
  }
  element.style.opacity = "0";
}
q.fadeOut = fadeOut;

/** Replaces $el.fadeIn(3000) */
export function fadeIn(target, ms) {
  const element = getElement(target);
  element.style.opacity = "0";
  if (element.style.display === "none") element.style.display = "";

  if (ms) {
    const originalTrans = element.style.transition || "";
    element.style.opacity = "0.01";
    element.style.transition = `opacity ${ms}ms`;
    const end = () => {
      element.style.opacity = "";
      element.style.transition = originalTrans;
    };
    element.addEventListener("transitionend", end, {
      once: true,
      capture: false,
    });
    setTimeout(() => (element.style.opacity = "1"), 1);
  } else {
    element.style.opacity = "1";
  }
}
q.fadeIn = fadeIn;

g.q = q;
export default q;
