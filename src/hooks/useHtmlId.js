import { useRef } from "react";
import { uuid } from "../util/string";

function useHtmlId(providedId) {
  const htmlId = useRef(providedId || uuid());
  return htmlId.current;
}

export default useHtmlId;
