import { useState, useCallback, useEffect } from "react";
const useMediaQuery = (query: string) => {
  const [targetReached, setTargetReached] = useState(false);

  type MediaQueryListEvent = {
    matches: boolean;
  }

  const updateTarget = useCallback(
    (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    },
    [setTargetReached]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      media.addEventListener("change", updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", updateTarget);
    }
  }, []);

  return targetReached;
};

export default useMediaQuery;
