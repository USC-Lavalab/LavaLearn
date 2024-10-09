import { menus, submenus } from "~/lib/data";
import readMarkdownContent from "~/lib/readMarkdownContent";
import readYamlFile from "~/lib/readYamlFile";
import { cn } from "~/lib/utils";
import { NavbarThemeController } from "../navbar";
import { Hero } from "./hero";
import { PostCard } from "./post-card";
import { SectionHeader } from "./section-header";

export default async function Home() {
  const data = await getData();

  return (
    <>
      <NavbarThemeController theme="black" />
      <Hero />
      {menus.map((menu, i) => (
        <div
          key={i}
          className={cn(
            "py-12 px-6 flex flex-col gap-8",
            i % 2 === 0 ? "bg-black" : "bg-gray-900"
          )}
        >
          <SectionHeader>Get Started with {menu}</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data[menu].map((post, i) => (
              <PostCard key={i} post={post} index={i} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

async function getData() {
  const posts: Record<
    string,
    { title: string; description: string; coverImg: string; href: string }[]
  > = {};

  await Promise.all(
    menus.map(async (menu) => {
      posts[menu] = [];

      // Process submenus sequentially
      for (const submenu of Object.values(submenus)) {
        try {
          const postsList = (await readYamlFile(
            `_posts/${menu.split(" ")[0].toLowerCase()}/${submenu}/index.yaml`
          )) as string[];

          const firstPost = postsList[0];

          const { frontmatter } = await readMarkdownContent(
            `_posts/${menu
              .split(" ")[0]
              .toLowerCase()}/${submenu}/${firstPost}.mdx`
          );

          posts[menu].push({
            title: frontmatter.title,
            description: frontmatter.desc,
            coverImg: `/cover-images/` + frontmatter.coverImg,
            href: `${menu.split(" ")[0].toLowerCase()}/${submenu}/${firstPost}`,
          });
        } catch (error) {
          console.error(
            `Error processing ${menu.toLowerCase()}/${submenu}:`,
            error
          );
          // Continue with the next iteration despite the error
        }
      }
    })
  );

  return posts;
}
