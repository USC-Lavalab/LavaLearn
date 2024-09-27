import { compile, run } from "@mdx-js/mdx";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { NavbarThemeController } from "~/app/navbar";
import { Blockquote } from "~/components/content/blockquote";
import { YoutubePlayer } from "~/components/content/youtube-player";
import readMarkdownContent from "~/lib/readMarkdownContent";

export default async function BlogPost({
  params,
}: {
  params: { menu: string; submenu: string; slug: string };
}) {
  const data = await getData(`${params.menu}/${params.submenu}/${params.slug}`);

  // Compile the MDX source code to a function body
  const code = String(
    await compile(data.content, { outputFormat: "function-body" })
  );

  // @ts-expect-error type definition issue
  const { default: MDXContent } = await run(code, runtime);

  return (
    <>
      <NavbarThemeController theme="black" />
      <div className="bg-black px-8 pt-20 text-white overflow-hidden relative">
        <div className="absolute w-full h-full top-0 left-0 opacity-50">
          <Image
            priority
            src={`/cover-images/${data.frontmatter.coverImg}`}
            alt={`Cover Image from ${data.frontmatter.title}`}
            className="object-cover"
            fill
          />
        </div>
        <div className="max-w-3xl w-full mx-auto relative">
          <div className="text-center py-20 space-y-8">
            <a
              href={`/${params.menu}/${params.submenu}`}
              className="uppercase opacity-70 tracking-wide"
            >
              {params.submenu}
            </a>
            <h1 className="font-serif text-6xl md:text-7xl leading-tight">
              {data.frontmatter.title}
            </h1>
            {data.frontmatter.author && (
              <p className="uppercase font-medium opacity-80 text-sm tracking-wider">
                by {data.frontmatter.author}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 text-black px-8">
        <div className="w-full max-w-xl mx-auto">
          <div className="space-y-6 leading-relaxed mb-24">
            <MDXContent
              components={{
                h1: (props) => (
                  <h2
                    className="text-3xl font-serif font-bold text-primary pt-4"
                    {...props}
                  />
                ),
                h2: (props) => <h3 className="text-xl font-bold" {...props} />,
                h3: (props) => (
                  <h4
                    className="text-lg font-serif font-bold text-primary"
                    {...props}
                  />
                ),
                img: (props) => (
                  <div className="w-full">
                    <img className="rounded-lg" {...props} />
                    <p className="w-full opacity-30 font-semibold mt-3 text-sm tracking-wide">
                      {props.alt}
                    </p>
                  </div>
                ),
                hr: (props) => (
                  <div>
                    <hr className="mt-12 mb-8" {...props} />
                  </div>
                ),
                a: (props) => <a className="underline" {...props} />,
                ol: (props) => (
                  <ol className="list-decimal pl-6 space-y-2" {...props} />
                ),
                ul: (props) => (
                  <ul className="list-disc pl-6 space-y-2" {...props} />
                ),
                blockquote: Blockquote,

                YoutubePlayer: YoutubePlayer,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

async function getData(path: string) {
  const { content, frontmatter } = await readMarkdownContent(
    `_posts/${path}.mdx`
  );

  return { content, frontmatter };
}
