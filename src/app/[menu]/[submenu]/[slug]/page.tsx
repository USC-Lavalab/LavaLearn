import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

import { NavbarThemeController } from "~/app/navbar";
import { Blockquote } from "~/components/content/blockquote";
import { YoutubePlayer } from "~/components/content/youtube-player";
import readMarkdownContent from "~/lib/readMarkdownContent";

import HeroSection from "../hero";

export default async function BlogPost({ params }: { params: { menu: string; submenu: string; slug: string } }) {
  const data = await getData(`${params.menu}/${params.submenu}/${params.slug}`);

  // Compile the MDX source code to a function body
  const code = String(await compile(data.content, { outputFormat: "function-body" }));

  // @ts-expect-error type definition issue
  const { default: MDXContent } = await run(code, runtime);

  return (
    <>
      <NavbarThemeController theme="black" />
      <HeroSection
        coverImg={data.frontmatter.coverImg}
        title={data.frontmatter.title}
        menuLink={`/${params.menu}/${params.submenu}`}
        menuTitle={params.submenu}
        author={data.frontmatter.author}
      />
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

export async function generateMetadata({ params }: { params: { menu: string; submenu: string; slug: string } }) {
  const data = await getData(`${params.menu}/${params.submenu}/${params.slug}`);

  return {
    title: data.frontmatter.title,
  };
}
