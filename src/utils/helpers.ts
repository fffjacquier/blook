import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

type BookNote = {
  pageTitle: string;
  bookAuthor: string;
  bookTitle: string;
  pageSummary: string;
  publishedOn: string;
};

export async function loadContent(slug: string): Promise<BookNote & { content: string }> {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const {
    data: { pageTitle, bookTitle, bookAuthor, pageSummary, publishedOn },
    content,
  } = matter(rawContent);

  return {
    content,
    bookAuthor,
    bookTitle,
    pageTitle,
    pageSummary,
    publishedOn,
  };
}

export async function loadContents() {
  const files = await readDir(`/content`);

  const entries = [];
  for (let file of files) {
    const rawContent = await readFile(`/content/${file}`);

    const {
      data: { pageTitle, bookTitle, bookAuthor, pageSummary, publishedOn },
    } = matter(rawContent);

    entries.push({
      slug: file.replace('mdx', ''),
      pageTitle,
      bookTitle,
      bookAuthor,
      pageSummary,
      publishedOn,
    });

    return entries.sort((a, b) => (a.publishedOn > b.publishedOn ? -1 : 1));
  }
}

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf-8');
}

function readDir(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
