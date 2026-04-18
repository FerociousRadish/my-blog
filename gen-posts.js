const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts-list.js');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const arrayStr = JSON.stringify(files);

fs.writeFileSync(outputFile, `const POSTS = ${arrayStr};\n`);
console.log('Generated posts-list.js:', files);