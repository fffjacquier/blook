import Link from "next/link";

export type BlogPost = {
  bookTitle: string;
  bookAuthor: string;
  summary: string;
  slug: string;
}

export const DATA = [
  {
    bookTitle: 'Sunset limited',
    bookAuthor: 'James Lee Burke',
    summary: 'I had seen a dawn like this only twice in my life: once...',
    slug: 'sunset-limited',
  },
  {
    bookTitle: 'Pour qui sonne le glas',
    bookAuthor: 'Ernest Hemingway',
    summary: "Mourir n'était rien et il ne s'en faisait aucune peinture...",
    slug: 'pour-qui-sonne',
  }
]

export default function Home() {
  return <>
    <h1>A blog of books</h1>
    <h2>How to love to read</h2>

    {DATA.map(blogPost => (
      <article key={blogPost.slug}>
        <strong><Link href={`/${blogPost.slug}`}>{blogPost.bookTitle}, <em>{blogPost.bookAuthor}</em></Link></strong>
        <p>{blogPost.summary}</p>
      </article>
    ))}
  </>;
}
