import { loadContents } from '@/utils/helpers';
import Link from 'next/link';

export default async function Home() {
  const data = await loadContents();

  return (
    <section>
      <h1>A blog of books</h1>
      <h2>How to love to read</h2>

      <ol>
        {data?.map((entry) => (
          <li key={entry.slug}>
            <Link href={`${entry.slug}`}>
              <span>entry.bookTitle, entry.bookAuthor</span>
              <span>entry.pageSummary</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
