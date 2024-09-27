import Image from "next/image";
import Link from "next/link";
import { menus, submenus } from "~/lib/data";
import readMarkdownContent from "~/lib/readMarkdownContent";
import readYamlFile from "~/lib/readYamlFile";

export default async function Submenu({
  params,
}: {
  params: { menu: string; submenu: string };
}) {
  const data = await getData(`${params.menu}/${params.submenu}`);

  const menuTitle = menus.find(
    (v) => v.toLowerCase().split(" ")[0] === params.menu
  );
  const submenuTitle = Object.entries(submenus).find(
    (v) => v[1] === params.submenu
  )?.[0];

  return (
    <>
      <div className="bg-black px-4 pt-20 text-white overflow-hidden relative">
        <div className="max-w-3xl w-full mx-auto relative">
          <div className="text-center py-20 space-y-8">
            <a
              href={`/${params.menu}/${params.submenu}`}
              className="uppercase opacity-70 tracking-wide"
            >
              {menuTitle}
            </a>
            <h1 className="font-serif text-6xl md:text-7xl leading-tight">
              {submenuTitle}
            </h1>
          </div>
        </div>
      </div>
      <div className="my-20 text-black">
        <div className="space-y-12 w-full max-w-5xl mx-auto px-8">
          {data.map((post, i) => (
            <Link
              href={post.href}
              key={i}
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

  const postsList = (await readYamlFile(
    `_posts/${path}/index.yaml`
  )) as string[];

  for (const post of postsList) {
    try {
      const { frontmatter } = await readMarkdownContent(
        `_posts/${path}/${post}.mdx`
      );

      posts.push({
        title: frontmatter.title,
        description: frontmatter.desc,
        coverImg: `/cover-images/` + frontmatter.coverImg,
        href: `/${path}/${post}`,
      });
    } catch (_) {}
  }

  return posts;
}
