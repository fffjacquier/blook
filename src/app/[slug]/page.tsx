import { loadContent } from '@/utils/helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Post({ params }: { params: { slug: string } }) {
  const { content } = await loadContent(params.slug);

  return (
    <article>
      <MDXRemote source={content} />
    </article>
  );
}
