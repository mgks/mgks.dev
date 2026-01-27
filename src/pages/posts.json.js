import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  const map = posts.map(post => ({
    slug: post.slug, // This will be the NEW full slug (2026-01-27-title)
    title: post.data.title
  }));

  return new Response(JSON.stringify(map), {
    headers: { 'Content-Type': 'application/json' }
  });
}