import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/config';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.date <= new Date();
  });
  
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}