import { getAllSlugs, getPostBySlug } from '../../../lib/posts';

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: `${post.title} | 空飛ぶ車とドローンのニュース` };
}

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main>
      <div className="container">
        <a href="/" className="back-link">← 一覧に戻る</a>

        {post.image && <img src={post.image} alt={post.title} className="article-hero" />}

        <div className="post-meta" style={{ marginBottom: '0.8rem' }}>
          <span>{post.date}</span>
          {post.category && <span className="cat">{post.category}</span>}
        </div>

        <h1 className="article-title">{post.title}</h1>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {post.insight && (
          <div className="insight-box">
            <strong>ビジネスポイント：</strong> {post.insight}
          </div>
        )}

        {post.sourceUrl && (
          <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
            元記事を見る（{post.source}）→
          </a>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags" style={{ marginTop: '1rem' }}>
            {post.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        )}

        <div className="cta">
          <p>毎週のニュースを受け取る</p>
          <a href="#" className="cta-btn line">LINE公式に登録</a>
          <a href="#" className="cta-btn mail">メルマガ登録</a>
        </div>
      </div>
    </main>
  );
}
