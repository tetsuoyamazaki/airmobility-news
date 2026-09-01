import './globals.css';

export const metadata = {
  title: '空飛ぶ車とドローンのニュース',
  description: 'ドローンから空飛ぶ車へ。エアモビリティの全景を、ビジネス視点で配信',
  openGraph: {
    title: '空飛ぶ車とドローンのニュース',
    description: 'ドローンから空飛ぶ車へ。エアモビリティの全景を、ビジネス視点で配信',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="container">
            <div className="header-top">
              <a href="/" className="logo-wrap">
                <span className="logo-text"><span className="logo-air">AIR</span>MOBILITY</span>
                <span className="logo-underline"></span>
                <span className="logo-sub">空飛ぶ車とドローンのニュース</span>
              </a>
            </div>
            <p className="site-tagline">
              ドローンから空飛ぶ車へ。エアモビリティの全景を、ビジネス視点で配信
            </p>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div>
            <a href="https://www.skytrans.jp/" target="_blank" rel="noopener noreferrer">運営会社</a>
            <a href="https://www.skytrans.jp/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
          </div>
          <div style={{ marginTop: '0.6rem' }}>© 2025 SKYtrans.LLC</div>
        </footer>
      </body>
    </html>
  );
}
