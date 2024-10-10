import { compile, run } from "@mdx-js/mdx";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";

import { NavbarThemeController } from "~/app/navbar";
import { Blockquote } from "~/components/content/blockquote";
import { YoutubePlayer } from "~/components/content/youtube-player";
import readMarkdownContent from "~/lib/readMarkdownContent";

export default async function BlogPost({ params }: { params: { menu: string; submenu: string; slug: string } }) {
  const data = await getData(`${params.menu}/${params.submenu}/${params.slug}`);

  // Compile the MDX source code to a function body
  const code = String(await compile(data.content, { outputFormat: "function-body" }));

  // @ts-expect-error type definition issue
  const { default: MDXContent } = await run(code, runtime);

  return (
    <>
      <NavbarThemeController theme="black" />
      <div className="relative overflow-hidden bg-black px-8 pt-20 text-white">
        <div className="absolute left-0 top-0 h-full w-full opacity-50">
          <Image
            priority
            src={`/cover-images/${data.frontmatter.coverImg}`}
            alt={`Cover Image from ${data.frontmatter.title}`}
            className="object-cover"
            fill
          />
        </div>
        <div className="relative mx-auto w-full max-w-3xl">
          <div className="space-y-8 py-20 text-center">
            <a href={`/${params.menu}/${params.submenu}`} className="uppercase tracking-wide opacity-70">
              {params.submenu}
            </a>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">{data.frontmatter.title}</h1>
            {data.frontmatter.author && (
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">by {data.frontmatter.author}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 px-6 text-black">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-24 space-y-6 leading-relaxed">
            <MDXContent
              components={{
                h1: props => <h2 className="pt-4 font-serif text-3xl font-bold text-primary" {...props} />,
                h2: props => <h3 className="text-xl font-bold" {...props} />,
                h3: props => <h4 className="font-serif text-lg font-bold text-primary" {...props} />,
                img: props => (
                  <div className="w-full">
                    <img className="rounded-lg" {...props} />
                    <p className="mt-3 w-full text-sm font-semibold tracking-wide opacity-30">{props.alt}</p>
                  </div>
                ),
                hr: props => (
                  <div>
                    <hr className="mb-8 mt-12" {...props} />
                  </div>
                ),
                a: props => <a className="underline" {...props} />,
                ol: props => <ol className="list-decimal space-y-2 pl-6" {...props} />,
                ul: props => <ul className="list-disc space-y-2 pl-6" {...props} />,
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
  const { content, frontmatter } = await readMarkdownContent(`_posts/${path}.mdx`);

  return { content, frontmatter };
}
