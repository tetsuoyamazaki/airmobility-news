import { getPostsByType } from '../lib/posts';

export default function Home() {
  const posts = getPostsByType('news');
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main>
      <div className="container">
        <div className="top-lead">
          <span className="update-badge">✦ 毎週更新</span>
          <span className="concept-note">単なるニュースではなく、市場性・収益性・リスクをビジネス視点で分析</span>
        </div>

        {posts.length === 0 && (
          <p style={{ color: '#888' }}>記事はまだありません。</p>
        )}

        {featured && (
          <a href={`/posts/${featured.slug}`} className="featured-card">
            {featured.image && (
              <div className="featured-img" style={{ backgroundImage: `url(${featured.image})` }} />
            )}
            <div className="featured-body">
              <div className="post-meta">
                <span>{featured.date}</span>
                {featured.category && <span className="cat">{featured.category}</span>}
                <span className="read-time">読了：{featured.readingTime}分</span>
                {featured.isNew && <span className="new-badge">NEW</span>}
              </div>
              <h2 className="featured-title">{featured.title}</h2>
              {featured.summary && <p className="featured-summary">{featured.summary}</p>}
              {featured.insight && (
                <div className="featured-insight">
                  <div className="featured-insight-label">ビジネスポイント</div>
                  <div className="featured-insight-text">{featured.insight}</div>
                </div>
              )}
            </div>
          </a>
        )}

        {rest.length > 0 && (
          <div className="post-grid">
            {rest.map((post) => (
              <a href={`/posts/${post.slug}`} key={post.slug} className="grid-card">
                {post.image && (
                  <div className="grid-card-img" style={{ backgroundImage: `url(${post.image})` }} />
                )}
                <div className="grid-card-body">
                  <div className="post-meta">
                    <span>{post.date}</span>
                    {post.category && <span className="cat">{post.category}</span>}
                    <span className="read-time">読了：{post.readingTime}分</span>
                    {post.isNew && <span className="new-badge">NEW</span>}
                  </div>
                  <h3 className="grid-card-title">{post.title}</h3>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.slice(0, 3).map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
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
