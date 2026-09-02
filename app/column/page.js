import { getPostsByType } from '../../lib/posts';

export const metadata = {
  title: 'コラム | AIRMOBILITY',
  description: '空飛ぶ車・ドローンを体系立てて学べる解説とオピニオン。',
};

export default function Column() {
  const posts = getPostsByType('column');

  return (
    <main>
      <div className="container">
        <div className="top-lead">
          <span className="update-badge">コラム</span>
          <span className="concept-note">空飛ぶ車・エアモビリティを、基礎から体系立てて学べる解説記事</span>
        </div>

        {posts.length === 0 && (
          <p style={{ color: '#888' }}>コラムはまだありません。</p>
        )}

        {posts.length > 0 && (
          <div className="post-grid">
            {posts.map((post) => (
              <a href={`/posts/${post.slug}`} key={post.slug} className="grid-card">
                {post.image && (
                  <div className="grid-card-img" style={{ backgroundImage: `url(${post.image})` }} />
                )}
                <div className="grid-card-body">
                  <div className="post-meta">
                    <span>{post.date}</span>
                    {post.category && <span className="cat">{post.category}</span>}
                    {post.isNew && <span className="new-badge">NEW</span>}
                  </div>
                  <h3 className="grid-card-title">{post.title}</h3>
                  {post.summary && <p className="grid-card-summary">{post.summary}</p>}
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
