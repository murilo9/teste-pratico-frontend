import { useState, useEffect } from "react";

export function useIsMobileView() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth < 600);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileView;
}
