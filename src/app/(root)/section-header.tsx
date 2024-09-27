"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function SectionHeader({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.h2
      ref={ref}
      className="font-serif text-primary text-2xl"
      initial={{ opacity: 0, y: -10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{
        duration: 0.6,
        delay: 0.5,
      }}
    >
      {children}
    </motion.h2>
  );
}
