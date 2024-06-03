import { useSyncExternalStore } from "react";

const createMediaQueryHook = (query: string) => {
  return function useMediaQuery() {
    function subscribe(cb: () => void) {
      const queryList = window.matchMedia(query);
      queryList.addEventListener("change", cb);
      return () => queryList.removeEventListener("change", cb);
    }

    function getSnapshot() {
      return window.matchMedia(query).matches;
    }

    return useSyncExternalStore(subscribe, getSnapshot);
  };
};
export const useIsDarkMode = createMediaQueryHook(
  "(prefers-color-scheme: dark)",
);
