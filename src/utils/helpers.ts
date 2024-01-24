import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";

type Article = {
  title: string;
  content: string;
  slug: string;
  publishedOn: string;
};

export async function getList(type: string = "exp") {
  const files = await readDirectory(`/${type}`);

  const articles: Article[] = [];

  for (let filename of files) {
    const rawContent = await readFile(`/${type}/${filename}`);

    const { data: frontmatter } = matter(rawContent);

    articles.push({
      slug: filename.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return articles.sort((b, c) => (b.publishedOn < c.publishedOn ? 1 : -1));
}

export const loadArticle = React.cache(async function loadArticle(
  slug: string,
  type: string = "exp"
) {
  const rawContent = await readFile(`/${type}/${slug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
