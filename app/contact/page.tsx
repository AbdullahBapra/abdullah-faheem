import type { Metadata } from "next";
import MultiArticleForm from "../components/pages/Multiarticleform";


export const metadata: Metadata = {
  title: "Hire a Freelance Developer | Let's Work Together",
  description:
    "Looking to hire a developer, build a web app, or collaborate on an open-source project? Skip the small talk — tell me what you need and I'll get back to you within 24 hours.",
  keywords: [
    "hire a developer",
    "freelance web developer",
    "build a web app",
    "MVP development",
    "full-stack developer for hire",
    "AI integration developer",
    "Next.js developer",
    "1-on-1 consulatant for MVP devlopment ",
  ],
  alternates: {
    canonical: "https://abdullah-faheem.vercel.app/projects",
  },
  openGraph: {
    title: "Hire a Freelance Developer | Let's Work Together",
    description:
      "Tell me what you need — startup, product, open-source collaboration, or a full-time role. I'll reply within 24 hours.",
    url: "https://abdullah-faheem.vercel.app/projects",
    siteName: "Your Name | Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hire a Freelance Developer | Let's Work Together",
    description:
      "Tell me what you need — startup, product, open-source collaboration, or a full-time role. I'll reply within 24 hours.",
  },
};

 
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Work With Me",
  description:
    "Hire a full-stack developer for your startup, web app, freelance project, or open-source collaboration.",
  url: "https://abdullah-faheem.vercel.app/projects",
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MultiArticleForm />
    </>
  );
}