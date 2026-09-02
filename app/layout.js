import './globals.css';

export const metadata = {
  metadataBase: new URL('https://airmobility.jp'),
  title: '空飛ぶ車とドローンのニュース | AIRMOBILITY',
  description: 'ドローンから空飛ぶ車へ。エアモビリティの最新ニュースを、市場性・収益性・リスクといったビジネス視点で厳選してお届けします。経営者・起業家・投資家のための業界メディア。',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: '空飛ぶ車とドローンのニュース | AIRMOBILITY',
    description: 'ドローンから空飛ぶ車へ。エアモビリティの全景を、ビジネス視点で配信',
    url: 'https://airmobility.jp',
    siteName: 'AIRMOBILITY',
    locale: 'ja_JP',
    type: 'website',
    images: [
      { url: '/ogp.png', width: 1200, height: 630, alt: 'AIRMOBILITY - 空飛ぶ車とドローンのニュース' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '空飛ぶ車とドローンのニュース | AIRMOBILITY',
    description: 'ドローンから空飛ぶ車へ。エアモビリティの全景を、ビジネス視点で配信',
    images: ['/ogp.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1J26SM5W6K"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1J26SM5W6K');
            `,
          }}
        />
      </head>
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
