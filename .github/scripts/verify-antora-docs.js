const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.join('spikes', 'antora-pilot', 'build', 'site');

const requiredFiles = [
  path.join(siteRoot, 'index.html'),
  path.join(siteRoot, '_', 'css', 'site.css'),
  path.join(siteRoot, '_', 'js', 'site.js'),
  path.join(siteRoot, 'demoqa-docs', 'current', 'index.html'),
  path.join(siteRoot, 'demoqa-docs', 'current', 'developer-how-to.html'),
  path.join(siteRoot, 'demoqa-docs', 'current', 'features', 'conventions.html'),
];

const checks = [
  {
    file: path.join(siteRoot, 'demoqa-docs', 'current', 'index.html'),
    mustInclude: 'developer-how-to.html',
    description: 'landing page links to Developer How-To',
  },
  {
    file: path.join(siteRoot, 'demoqa-docs', 'current', 'developer-how-to.html'),
    mustInclude: 'Current CI Behavior',
    description: 'Developer How-To page rendered expected section',
  },
  {
    file: path.join(siteRoot, 'demoqa-docs', 'current', 'features', 'conventions.html'),
    mustInclude: 'Naming Conventions',
    description: 'Conventions page rendered expected section',
  },
];

const failures = [];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing expected output file: ${filePath}`);
  }
}

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    continue;
  }

  const content = fs.readFileSync(check.file, 'utf8');
  if (!content.includes(check.mustInclude)) {
    failures.push(
      `Failed check: ${check.description} (missing "${check.mustInclude}" in ${check.file})`
    );
  }
}

if (failures.length > 0) {
  console.error('Antora docs smoke check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Antora docs smoke check passed.');
