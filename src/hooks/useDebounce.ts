import * as _ from "lodash";
import { useCallback } from "react";
const useDebounce = (callback: any, delay: number) => {
  const debounceFn = useCallback(
    _.debounce((...args) => callback(...args), delay),
    [delay]
  );
  return debounceFn;
};

export default useDebounce;
