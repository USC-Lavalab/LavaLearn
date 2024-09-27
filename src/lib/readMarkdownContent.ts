import { promises as fs } from "fs";
import matter from "gray-matter";
import * as path from "path";

export default async function readMarkdownContent(filePath: string) {
  try {
    // Resolve the file path relative to the project root
    const fullPath = path.join(process.cwd(), filePath);

    // Read the file asynchronously
    const fileContents = await fs.readFile(fullPath, "utf8");

    // Parse the frontmatter
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      content: content,
    };
  } catch (error) {
    console.error("Error reading markdown file:", error);
    throw error;
  }
}
