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
    <Link
      href={post.href}
      className="flex flex-col md:flex-row gap-8 items-center"
    >
      <div className="w-full md:w-[40%] aspect-[3/2] relative flex-shrink-0">
        <Image
          src={post.coverImg}
          alt={`Cover Image from ${post.title}`}
          className="object-cover rounded-lg"
          fill
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-bold text-primary">
          {post.title}
        </h1>
        <p className="text-lg opacity-75">{post.description}</p>
        <p className="font-medium text-sm">Read More →</p>
      </div>
    </Link>
  );
}
