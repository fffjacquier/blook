import Link from "next/link";


const DATA = [
  {
    bookTitle: 'Sunset limited',
    bookAuthor: 'James Lee Burke',
    summary: 'I had seen a dawn like this only twice in my life: once...',
    slug: 'sunset-limited',
  }
]

export default function Home() {
  return <>
    <h1>A blog of books</h1>
    <h2>How to love to read</h2>

    {DATA.map(blogPost => (
      <article>
        <strong><Link href={`/${blogPost.slug}`}>{blogPost.bookTitle}, <em>{blogPost.bookAuthor}</em></Link></strong>
        <p>{blogPost.summary}</p>
      </article>
    ))}
  </>;
}
