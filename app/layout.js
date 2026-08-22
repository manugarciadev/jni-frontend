"use client";

import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import "../styles/style.scss";

export default function RootLayout({ children }) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />

        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        {/* <Header />*/}
        {children}
        {/*<Footer /> */}
        {/*<button
          type="button"
          onClick={handleBackToTop}
          className="fixed right-6 bottom-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1a7a6e] text-white shadow-xl transition hover:bg-[#16624f]"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M12 4.5a.75.75 0 0 1 .53.22l7 7a.75.75 0 1 1-1.06 1.06L13 7.81V20.25a.75.75 0 0 1-1.5 0V7.81L5.53 12.78a.75.75 0 1 1-1.06-1.06l7-7A.75.75 0 0 1 12 4.5z" />
          </svg>
        </button>*/}
      </body>
    </html>
  );
}
