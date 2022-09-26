import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
// import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import Layout from "../../components/layouts";
import { COMPONENTS_PATH, componentFilePaths } from "../../utils/mdxUtils";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

export default function FoundationPage({ source, frontMatter }) {
  return (
    <Layout>
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const componentFilePath = path.join(COMPONENTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(componentFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = componentFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
