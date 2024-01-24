import { BlogPost, DATA } from '../page';
import styles from './page.module.css';

export default function Post({ params }: { params: { slug: string } }) {
  const { bookTitle, bookAuthor, summary } = DATA.find(
    (d) => d.slug === params.slug
  ) as BlogPost;

  return (
    <>
      <h1>{bookTitle}</h1>
      <h2 className={styles.main}>{bookAuthor}</h2>

      <p>{summary}</p>
    </>
  );
}
