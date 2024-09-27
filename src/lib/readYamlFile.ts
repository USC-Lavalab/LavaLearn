import { promises as fs } from "fs";
import yaml from "js-yaml";
import * as path from "path";

async function readYamlFile(filePath: string) {
  // Resolve the file path relative to the project root
  const fullPath = path.join(process.cwd(), filePath);

  // Read the file asynchronously
  const fileContents = await fs.readFile(fullPath, "utf8");

  // Parse the YAML content
  const data = yaml.load(fileContents);

  return data;
}

export default readYamlFile;
