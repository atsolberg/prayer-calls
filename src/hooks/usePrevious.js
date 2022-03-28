import { useRef, useEffect } from "react";

/**
 * Track the previous value of something.
 * @param {*} value - the value to track
 * @param {boolean} [asRef] - if true, will return the ref instead of the value
 * See https://egghead.io/lessons/react-track-values-over-the-course-of-renders-with-react-useref-in-a-custom-useprevious-hook
 */
function usePrevious(value, asRef) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  if (asRef) return ref;
  return ref.current;
}

export default usePrevious;
