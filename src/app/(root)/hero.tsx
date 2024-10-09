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
    <div className="w-full bg-black py-48 text-white text-center relative overflow-hidden">
      <div
        className="absolute h-full w-full top-0"
        style={{ marginTop: scrollValue / 2 }}
      >
        <Image
          priority
          src={HeroImage}
          placeholder="blur"
          fill
          className="opacity-30 relative object-cover"
          alt="LavaLab Demo Day"
        />
      </div>
      <motion.div
        className="relative flex items-center flex-col gap-4 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-serif max-w-3xl w-full"
          variants={itemVariants}
        >
          Welcome to your entrepreneurial launchpad.
        </motion.h1>
        <motion.p
          className="max-w-xl w-full font-medium text-gray-300/70"
          variants={itemVariants}
        >
          LavaLearn is USC LavaLab&apos;s open-access curriculum, providing tech
          and entrepreneurship resources, workshops, and fireside chats to the
          USC community and the greater public.
        </motion.p>
      </motion.div>
      <div className="absolute bottom-12 opacity-80 w-full">
        <CircleArrowDown className="w-8 h-8 mx-auto animate-bounce stroke-1" />
      </div>
    </div>
  );
}
