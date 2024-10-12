"use client";

import { motion } from "framer-motion";
import { CircleArrowDown } from "lucide-react";
import Image from "next/image";

import HeroImage from "~/app/hero-image.webp";
import useScrollDetection from "~/lib/hooks/useScrollDetection";

export function Hero() {
  const { scrollValue } = useScrollDetection();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-black py-36 text-center text-white md:py-48">
      <div className="absolute top-0 h-full w-full" style={{ marginTop: scrollValue / 2 }}>
        <Image
          priority
          src={HeroImage}
          placeholder="blur"
          fill
          className="relative object-cover opacity-30"
          alt="LavaLab Demo Day"
        />
      </div>
      <motion.div
        className="relative flex flex-col items-center gap-4 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="w-full max-w-3xl font-serif text-5xl md:text-6xl" variants={itemVariants}>
          Welcome to your entrepreneurial launchpad.
        </motion.h1>
        <motion.p className="w-full max-w-xl font-medium text-gray-300/70" variants={itemVariants}>
          LavaLearn is USC LavaLab&apos;s open-access curriculum, providing tech and entrepreneurship resources,
          workshops, and fireside chats to the USC community and the greater public.
        </motion.p>
      </motion.div>
      <div className="absolute bottom-12 w-full opacity-80">
        <CircleArrowDown className="mx-auto h-8 w-8 animate-bounce stroke-1" />
      </div>
    </div>
  );
}
