"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const MotionPost = motion.div;

export function PostCard({
  post,
  index,
}: {
  post: { title: string; description: string; coverImg: string; href: string };
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MotionPost
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    >
      <Link href={post.href} className="relative flex flex-col gap-2 text-white">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image src={post.coverImg} fill className="object-cover" alt={`Cover Image for ${post.title}`} />
        </div>
        <p className="mt-2 text-xl">{post.title}</p>
        <p className="opacity-80">{post.description}</p>
        <p className="text-sm font-medium">Read More →</p>
      </Link>
    </MotionPost>
  );
}
