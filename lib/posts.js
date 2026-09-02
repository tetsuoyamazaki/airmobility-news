import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter((n) => n.endsWith('.md'));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    let isNew = false;
    if (data.date) {
      const posted = new Date(data.date);
      const diffDays = (Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24);
      isNew = diffDays >= 0 && diffDays <= 7;
    }
    return {
      slug,
      title: data.title || '無題',
      date: data.date || '',
      category: data.category || '',
      source: data.source || '',
      sourceUrl: data.sourceUrl || '',
      image: data.image || '',
      insight: data.insight || '',
      tags: data.tags || [],
      summary: data.summary || '',
      isNew,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((n) => n.endsWith('.md'))
    .map((fileName) => ({ slug: fileName.replace(/\.md$/, '') }));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    contentHtml,
    title: data.title || '無題',
    date: data.date || '',
    category: data.category || '',
    source: data.source || '',
    sourceUrl: data.sourceUrl || '',
    image: data.image || '',
    insight: data.insight || '',
    tags: data.tags || [],
    summary: data.summary || '',
  };
}
