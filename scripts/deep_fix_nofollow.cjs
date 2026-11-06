const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let totalFixed = 0;

postFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace markdown link syntax with HTML containing target="_blank" rel="nofollow sponsored noopener"
  // For any external affiliate link
  content = content.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, (match, text, url) => {
    const isInternal = url.includes('freeip.blog') || url.startsWith('/') || url.startsWith('#');
    const isAffiliate = url.includes('aff') || url.includes('code=') || url.includes('register') || 
                        url.includes('gsyvip') || url.includes('twilight') || url.includes('flycat') || 
                        url.includes('wgetcloud') || url.includes('dalao');
    if (!isInternal && isAffiliate) {
      totalFixed++;
      return `<a href="${url}" target="_blank" rel="nofollow sponsored noopener">${text}</a>`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Deep fixed: ${file}`);
  }
});

console.log(`Comprehensive deep fix complete! Replaced ${totalFixed} affiliate links.`);
