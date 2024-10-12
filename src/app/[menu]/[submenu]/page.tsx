import { menus, submenus } from "~/lib/data";
import readMarkdownContent from "~/lib/readMarkdownContent";
import readYamlFile from "~/lib/readYamlFile";

import PostCard from "./post-card";

export default async function Submenu({ params }: { params: { menu: string; submenu: string } }) {
  const data = await getData(`${params.menu}/${params.submenu}`);

  const menuTitle = menus.find(v => v.toLowerCase().split(" ")[0] === params.menu);
  const submenuTitle = Object.entries(submenus).find(v => v[1] === params.submenu)?.[0];

  return (
    <>
      <div className="relative overflow-hidden bg-black px-4 pt-20 text-white">
        <div className="relative mx-auto w-full max-w-3xl">
          <div className="space-y-8 py-20 text-center">
            <a href={`/${params.menu}/${params.submenu}`} className="uppercase tracking-wide opacity-70">
              {menuTitle}
            </a>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">{submenuTitle}</h1>
          </div>
        </div>
      </div>
      <div className="my-20 text-black">
        <div className="mx-auto w-full max-w-5xl space-y-12 px-6">
          {data.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

async function getData(path: string) {
  const posts: {
    title: string;
    description: string;
    coverImg: string;
    href: string;
  }[] = [];

  const postsList = (await readYamlFile(`_posts/${path}/index.yaml`)) as string[];

  for (const post of postsList) {
    try {
      const { frontmatter } = await readMarkdownContent(`_posts/${path}/${post}.mdx`);

      posts.push({
        title: frontmatter.title,
        description: frontmatter.desc,
        coverImg: `/cover-images/` + frontmatter.coverImg,
        href: `/${path}/${post}`,
      });
    } catch {}
  }

  return posts;
}
