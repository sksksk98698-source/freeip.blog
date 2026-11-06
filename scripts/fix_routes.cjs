const fs = require('fs');
let code = fs.readFileSync('src/lib/routes.ts', 'utf8');
code = code.replace(/title:\s*config\.title,\s*posts:\s*items,/, (m) => {
  return "title: i ? `${config.title} - 第 ${i + 1} 页` : config.title,\n    posts: items,";
});
fs.writeFileSync('src/lib/routes.ts', code, 'utf8');
console.log('Successfully updated routes.ts pagination title via regex!');
