import fs from "fs";
import path from "path";

// POSTS_PATH is useful when you want to get the path to a specific file
export const FOUNDATIONS_PATH = path.join(process.cwd(), "mdx", "foundations");
export const COMPONENTS_PATH = path.join(process.cwd(), "mdx", "components");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const foundationFilePaths = fs
  .readdirSync(FOUNDATIONS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const componentFilePaths = fs
  .readdirSync(COMPONENTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));
