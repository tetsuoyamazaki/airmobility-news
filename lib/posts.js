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
    const { data, content } = matter(fileContents);
    let isNew = false;
    if (data.date) {
      const posted = new Date(data.date);
      const diffDays = (Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24);
      isNew = diffDays >= 0 && diffDays <= 7;
    }
    const charCount = (content || '').replace(/\s/g, '').length;
    const readingTime = Math.max(1, Math.round(charCount / 500));
    return {
      slug,
      title: data.title || '無題',
      date: data.date || '',
      type: data.type || 'news',
      vol: data.vol || null,
      category: data.category || '',
      source: data.source || '',
      sourceUrl: data.sourceUrl || '',
      image: data.image || '',
      insight: data.insight || '',
      tags: data.tags || [],
      summary: data.summary || '',
      isNew,
      readingTime,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByType(type) {
  const filtered = getSortedPosts().filter((p) => (p.type || 'news') === type);
  if (type === 'column') {
    return filtered.sort((a, b) => (a.vol || 999) - (b.vol || 999));
  }
  return filtered;
}

export function getColumnNav(slug) {
  const columns = getPostsByType('column');
  const idx = columns.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? columns[idx - 1] : null,
    next: idx < columns.length - 1 ? columns[idx + 1] : null,
  };
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
  const charCount = (content || '').replace(/\s/g, '').length;
  const readingTime = Math.max(1, Math.round(charCount / 500));
  return {
    slug,
    contentHtml,
    title: data.title || '無題',
    date: data.date || '',
    type: data.type || 'news',
    vol: data.vol || null,
    category: data.category || '',
    source: data.source || '',
    sourceUrl: data.sourceUrl || '',
    image: data.image || '',
    insight: data.insight || '',
    tags: data.tags || [],
    summary: data.summary || '',
    readingTime,
  };
}
