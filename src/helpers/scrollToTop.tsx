import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * SCROLL COMPONENT
 *
 * ===============================================
 *
 * This component contains logic that scrolls the page to the top when the pathname changes
 *
 *
 *
 */

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export { ScrollToTop };
