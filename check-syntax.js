const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const ignoredDirs = new Set(['.git', 'node_modules']);

const getJavaScriptFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    if (ignoredDirs.has(entry.name)) {
      return;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getJavaScriptFiles(fullPath));
      return;
    }

    if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  });

  return files;
};

const files = getJavaScriptFiles(projectRoot);
let hasError = false;

files.forEach((file) => {
  const result = spawnSync(process.execPath, ['--check', file], {
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    hasError = true;
  }
});

process.exit(hasError ? 1 : 0);
