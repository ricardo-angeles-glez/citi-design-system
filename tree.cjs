const fs = require('fs');
const path = require('path');

const IGNORE = [
  'node_modules', '.git', 'dist', 'build', '.next',
  '.cache', 'coverage', '.vscode', '.idea',
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  '.DS_Store', 'thumbs.db'
];

function getTree(dir, prefix = '', isLast = true) {
  const name = path.basename(dir);
  let result = '';

  if (prefix === '') {
    result += `${name}/\n`;
  } else {
    result += `${prefix}${isLast ? '└── ' : '├── '}${name}${fs.statSync(dir).isDirectory() ? '/' : ''}\n`;
  }

  if (fs.statSync(dir).isDirectory()) {
    let items = fs.readdirSync(dir)
      .filter(item => !IGNORE.includes(item) && !item.startsWith('.'))
      .sort((a, b) => {
        const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

    items.forEach((item, index) => {
      const itemPath = path.join(dir, item);
      const isLastItem = index === items.length - 1;
      const newPrefix = prefix === '' ? '' : `${prefix}${isLast ? '    ' : '│   '}`;
      result += getTree(itemPath, newPrefix, isLastItem);
    });
  }

  return result;
}

const tree = getTree(process.cwd());
fs.writeFileSync('PROJECT_TREE.txt', tree);
console.log(tree);
console.log('\n✅ Guardado en PROJECT_TREE.txt');