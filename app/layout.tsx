import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Abdullah Faheem | Full Stack Developer | Agentic Ai | AI powered Web & Apps",
  description:
    "Abdullah Faheem is an AI-Powered Web & App Builder, Agentic AI Developer, and MERN Stack Engineer focused on building intelligent automation systems, AI-driven SaaS platforms, and scalable full-stack applications.",
  url: "https://abdullah-faheem.vercel.app/",
  ogImage:
    "https://abdullah-faheem.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fsnc9ollo%2Fproduction%2Fb93dad570f85582ea2266968f70f093e541e3ff5-940x911.jpg&w=640&q=100",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "https://abdullah-faheem.vercel.app/",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  other: {
    "google-site-verification": "_JcbugrziQXjKdx_1xP3ekjUbs7ree5BLHCY4KJLzEw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Script
          id="global-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://abdullah-faheem.vercel.app/#person",
                  name: "Abdullah Faheem",
                  url: "https://abdullah-faheem.vercel.app",
                  sameAs: [
                    "https://github.com/AbdullahBapra",
                    "https://www.linkedin.com/in/abdullah-faheem-724196315/",
                    "https://twitter.com/AbdullahFa69598"
                  ],
                  jobTitle: "Full Stack Developer & AI Engineer",
                  image: options.ogImage,
                  description: options.description
                },
                {
                  "@type": "WebSite",
                  "@id": "https://abdullah-faheem.vercel.app/#website",
                  url: "https://abdullah-faheem.vercel.app",
                  name: "Abdullah Faheem Portfolio",
                  publisher: {
                    "@id": "https://abdullah-faheem.vercel.app/#person"
                  }
                }
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}
