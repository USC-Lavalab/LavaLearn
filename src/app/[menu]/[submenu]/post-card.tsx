import Image from "next/image";
import Link from "next/link";

export default function PostCard({
  post,
}: {
  post: {
    title: string;
    description: string;
    coverImg: string;
    href: string;
  };
}) {
  return (
    <Link href={post.href} className="flex flex-col items-center gap-8 md:flex-row">
      <div className="relative aspect-[3/2] w-full flex-shrink-0 md:w-[40%]">
        <Image src={post.coverImg} alt={`Cover Image from ${post.title}`} className="rounded-lg object-cover" fill />
      </div>
      <div className="space-y-4">
        <h1 className="font-serif text-4xl font-bold text-primary">{post.title}</h1>
        <p className="text-lg opacity-75">{post.description}</p>
        <p className="text-sm font-medium">Read More →</p>
      </div>
    </Link>
  );
}
