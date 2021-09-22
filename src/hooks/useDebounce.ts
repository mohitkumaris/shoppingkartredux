import * as _ from "lodash";
import { useCallback } from "react";
const useDebounce = (callback: any, delay: number) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    _.debounce((...args) => callback(...args), delay),
    [delay]
  );
  return debounceFn;
};

export default useDebounce;
