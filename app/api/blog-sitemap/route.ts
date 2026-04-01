import { postsQuery } from "@/lib/sanity.query";
import { sanityFetch } from "@/lib/sanity.client";
import { PostType } from "@/types";

export async function GET() {
  try {
    // Fetch all posts from Sanity
    const posts = (await sanityFetch({
      query: postsQuery,
      tags: ["Post"],
    })) as PostType[];

    // Only include published posts
    const filteredPosts = posts.filter(post => post.isPublished === true);

    // Map posts to sitemap XML entries
    const urls = filteredPosts.map(post => `
      <url>
        <loc>https://abdullah-faheem.vercel.app/blog/${post.slug}</loc>
        <lastmod>${post._updatedAt || post._createdAt}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `).join("");

    // Build complete sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

    // Return response with cache headers to avoid 304
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache, no-store, must-revalidate", 
      },
    });

  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}