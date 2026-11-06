const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk(distDir);
console.log('Total HTML files in dist:', htmlFiles.length);

let canonicalIssues = [];
let nofollowIssues = [];
let brandLeakedIssues = [];
let titleDuplication = {};
let thinContent = [];
let jsonLdMissing = [];

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const relPath = path.relative(distDir, f).replace(/\\/g, '/');

  // 1. Canonical check
  const canMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                   content.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (!canMatch) {
    canonicalIssues.push({ file: relPath, reason: 'Missing canonical' });
  } else {
    const cUrl = canMatch[1];
    if (!cUrl.startsWith('https://freeip.blog')) {
      canonicalIssues.push({ file: relPath, canonical: cUrl, reason: 'Domain mismatch / non-https' });
    }
  }

  // 2. Title duplication check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    const t = titleMatch[1].trim();
    titleDuplication[t] = titleDuplication[t] || [];
    titleDuplication[t].push(relPath);
  }

  // 3. Check JSON-LD
  const jsonLdMatch = content.match(/<script type=["']application\/ld\+json["']>([^<]+)<\/script>/i);
  if (!jsonLdMatch) {
    jsonLdMissing.push(relPath);
  }

  // 4. Check external affiliate links for nofollow
  const aRegex = /<a\s+([^>]+)>/gi;
  let aMatch;
  while ((aMatch = aRegex.exec(content)) !== null) {
    const attrs = aMatch[1];
    const hrefMatch = attrs.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const isInternal = href.includes('freeip.blog') || href.includes('localhost:4321');
        const isAffiliate = href.includes('aff') || href.includes('code=') || href.includes('register') || 
                            href.includes('gsyvip') || href.includes('twilight') || href.includes('flycat');
        if (!isInternal && isAffiliate) {
          const relMatch = attrs.match(/rel=["']([^"']+)["']/i);
          if (!relMatch || !relMatch[1].includes('nofollow')) {
            nofollowIssues.push({ file: relPath, href: href, tag: aMatch[0] });
          }
        }
      }
    }
  }

  // 5. Upstream domain or unwanted traces
  if (content.includes('everfu') || content.includes('efu.me') || content.includes('freejiedian.homes') || content.includes('localhost:4321')) {
    brandLeakedIssues.push({ file: relPath, leak: 'Contains everfu/efu.me/freejiedian.homes/localhost:4321' });
  }

  // 6. Content length on post pages
  if (relPath.startsWith('p/')) {
    // Strip tags roughly
    const text = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ');
    const charCount = text.length;
    if (charCount < 2000) {
      thinContent.push({ file: relPath, charCount });
    }
  }
});

console.log('--- AUDIT METRICS ---');
console.log('1. Canonical issues:', canonicalIssues.length);
if (canonicalIssues.length > 0) console.log(canonicalIssues.slice(0, 5));

console.log('2. Nofollow issues on affiliate links:', nofollowIssues.length);
if (nofollowIssues.length > 0) console.log(nofollowIssues.slice(0, 5));

console.log('3. Trace/Domain leaks:', brandLeakedIssues.length);
if (brandLeakedIssues.length > 0) console.log(brandLeakedIssues.slice(0, 5));

console.log('4. JSON-LD missing pages count:', jsonLdMissing.length);

console.log('5. Thin content on /p/ pages (<2000 chars):', thinContent.length);
if (thinContent.length > 0) console.log(thinContent);

const dupTitles = Object.keys(titleDuplication).filter(k => titleDuplication[k].length > 1);
console.log('6. Duplicate titles count:', dupTitles.length);
if (dupTitles.length > 0) {
  dupTitles.slice(0, 5).forEach(k => {
    console.log(`Title "${k}" appears in:`, titleDuplication[k]);
  });
}
