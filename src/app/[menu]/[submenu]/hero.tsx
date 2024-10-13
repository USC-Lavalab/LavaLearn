import Image from "next/image";

export default function HeroSection({
  coverImg,
  title,
  menuLink,
  menuTitle,
  author,
}: {
  coverImg?: string;
  title: string;
  menuLink: string;
  menuTitle: string;
  author?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-black px-8 pt-20 text-white">
      {/* Conditionally render the cover image */}
      {coverImg && (
        <div className="absolute left-0 top-0 h-full w-full opacity-50">
          <Image
            priority
            src={`/cover-images/${coverImg}`}
            alt={`Cover Image from ${title}`}
            className="object-cover"
            fill
          />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="space-y-8 py-20 text-center">
          <a href={menuLink} className="uppercase tracking-wide opacity-70">
            {menuTitle}
          </a>
          <h1 className="font-serif text-5xl leading-tight md:text-6xl">{title}</h1>

          {/* Conditionally render the author */}
          {author && <p className="text-sm font-medium uppercase tracking-wider opacity-80">by {author}</p>}
        </div>
      </div>
    </div>
  );
}
