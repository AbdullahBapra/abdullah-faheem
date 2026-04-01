import { postsQuery } from "@/lib/sanity.query";
import { sanityFetch } from "@/lib/sanity.client";
import { PostType } from "@/types";


export async function GET() {
  const posts = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  }) as PostType[];

  const filteredPosts = posts.filter(post => post.isPublished === true);

  const urls = filteredPosts.map(post => `
    <url>
      <loc>https://abdullah-faheem.vercel.app/blog/${post.slug}</loc>
      <lastmod>${post._updatedAt || post._createdAt}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}