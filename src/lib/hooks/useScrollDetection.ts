"use client";

import { useEffect, useState } from "react";

const useScrollDetection = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 0);
      setScrollValue(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    // Call handleScroll once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { hasScrolled, scrollValue };
};

export default useScrollDetection;
