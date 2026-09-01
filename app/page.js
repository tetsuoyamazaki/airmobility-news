import { getSortedPosts } from '../lib/posts';

export default function Home() {
  const posts = getSortedPosts();

  return (
    <main>
      <div className="container">
        <div className="update-badge">✦ 毎週更新</div>

        <div className="post-list">
          {posts.length === 0 && (
            <p style={{ color: '#888' }}>記事はまだありません。</p>
          )}
          {posts.map((post) => (
            <a href={`/posts/${post.slug}`} key={post.slug} className="post-card">
              {post.image && (
                <img src={post.image} alt={post.title} className="post-card-img" />
              )}
              <div className="post-card-body">
                <div className="post-meta">
                  <span>{post.date}</span>
                  {post.category && <span className="cat">{post.category}</span>}
                </div>
                <h2>{post.title}</h2>
                {post.summary && <p className="post-summary">{post.summary}</p>}
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="cta">
          <p>毎週のニュースを受け取る</p>
          <a href="https://lin.ee/8X3vPpq" target="_blank" rel="noopener noreferrer" className="cta-btn line">LINE公式に登録</a>
          <a href="https://mail.os7.biz/add/1JVP" target="_blank" rel="noopener noreferrer" className="cta-btn mail">メルマガ登録</a>
        </div>
      </div>
    </main>
  );
}
