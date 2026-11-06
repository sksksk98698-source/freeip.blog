const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log('Scanning and fixing markdown files in:', postsDir);

let fixedCount = 0;

postFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Pattern 1: [直达官网](URL) or [直达xxx官网](URL) or [前往xxx官网](URL)
  content = content.replace(/\[(直达[^\]]*|立即[^\]]*前往[^\]]*|官网[^\]]*)\]\((https?:\/\/[^\s\)]+)\)/g, (match, text, url) => {
    if (!url.includes('freeip.blog') && !url.includes('localhost')) {
      fixedCount++;
      return `<a href="${url}" target="_blank" rel="nofollow sponsored noopener">${text}</a>`;
    }
    return match;
  });

  // Pattern 2: raw HTML <a href="AFF_URL"> without nofollow
  content = content.replace(/<a\s+href=["'](https?:\/\/[^"']+)["'](?![^>]*rel=)[^>]*>(.*?)<\/a>/gi, (match, url, text) => {
    if (!url.includes('freeip.blog') && !url.includes('localhost') && (url.includes('aff') || url.includes('code=') || url.includes('gsyvip') || url.includes('twilight') || url.includes('flycat'))) {
      fixedCount++;
      return `<a href="${url}" target="_blank" rel="nofollow sponsored noopener">${text}</a>`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

// Also fix table_42.txt if exists
const tablePath = path.join(__dirname, 'table_42.txt');
if (fs.existsSync(tablePath)) {
  let table = fs.readFileSync(tablePath, 'utf8');
  table = table.replace(/\[直达官网\]\((https?:\/\/[^\s\)]+)\)/g, (match, url) => {
    return `<a href="${url}" target="_blank" rel="nofollow sponsored noopener">直达官网</a>`;
  });
  fs.writeFileSync(tablePath, table, 'utf8');
  console.log('Updated table_42.txt');
}

console.log(`Finished fixing affiliate links! Total replacements: ${fixedCount}`);
