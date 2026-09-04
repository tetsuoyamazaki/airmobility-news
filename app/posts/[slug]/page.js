import { getAllSlugs, getPostBySlug, getColumnNav } from '../../../lib/posts';

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: `${post.title} | 空飛ぶ車とドローンのニュース` };
}

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug);
  const isColumn = post.type === 'column';
  const columnNav = isColumn ? getColumnNav(params.slug) : { prev: null, next: null };

  return (
    <main>
      <div className="container">
        <a href={isColumn ? '/column' : '/'} className="back-link">← {isColumn ? 'コラム一覧に戻る' : '一覧に戻る'}</a>

        {post.image && <img src={post.image} alt={post.title} className="article-hero" />}

        <div className="post-meta" style={{ marginBottom: '0.8rem' }}>
          <span>{post.date}</span>
          {post.category && <span className="cat">{post.category}</span>}
          <span className="read-time">読了：{post.readingTime}分</span>
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

        {isColumn && (columnNav.prev || columnNav.next) && (
          <div className="column-nav">
            {columnNav.prev ? (
              <a href={`/posts/${columnNav.prev.slug}`} className="column-nav-item prev">
                <span className="column-nav-label">← 前のコラム</span>
                <span className="column-nav-title">{columnNav.prev.title}</span>
              </a>
            ) : <span />}
            {columnNav.next ? (
              <a href={`/posts/${columnNav.next.slug}`} className="column-nav-item next">
                <span className="column-nav-label">次のコラム →</span>
                <span className="column-nav-title">{columnNav.next.title}</span>
              </a>
            ) : <span />}
          </div>
        )}

        <div className="cta">
          <p>毎週のニュースを受け取る</p>
          <a href="https://lin.ee/8X3vPpq" target="_blank" rel="noopener noreferrer" className="cta-btn line">LINE公式に登録</a>
          <a href="https://mail.os7.biz/add/1JVP" target="_blank" rel="noopener noreferrer" className="cta-btn mail">メルマガ登録</a>
        </div>
      </div>
    </main>
  );
}
