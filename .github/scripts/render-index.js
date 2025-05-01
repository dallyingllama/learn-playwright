/*
Test locally as follows:
create a history folder, be sure to add this folder to .gitignore
create some test folders

mkdir -p history/2025-04-30_12-00-00
echo "PASS" > history/2025-04-30_12-00-00/status.txt
touch history/2025-04-30_12-00-00/index.html

mkdir -p history/2025-04-30_13-00-00
echo "FAIL" > history/2025-04-30_13-00-00/status.txt
touch history/2025-04-30_13-00-00/index.html

node .github/scripts/render-index.js 

Then preview the index.html in a broweser.
*/

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const historyDir = path.resolve(__dirname, '../../history');
const templateFile = path.join(__dirname, 'index.ejs');
const outputFile = path.join(historyDir, 'index.html');

const folders = fs.readdirSync(historyDir).filter(f => {
  const fullPath = path.join(historyDir, f);
  return fs.statSync(fullPath).isDirectory();
});

const reportsByDate = {};
folders.sort().reverse().forEach(folder => {
  const parts = folder.split('_');
  if (parts.length < 2) return;
  const [date, time] = parts;

  const statusFile = path.join(historyDir, folder, 'status.txt');
  let icon = '❓';
  if (fs.existsSync(statusFile)) {
    const status = fs.readFileSync(statusFile, 'utf-8').trim();
    icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '❓';
  }

  if (!reportsByDate[date]) reportsByDate[date] = [];
  reportsByDate[date].push({
    icon,
    href: `${folder}/index.html`,
    time: time.replace(/-/g, ':')
  });
});

const today = new Date().toISOString().split('T')[0];

ejs.renderFile(templateFile, { reportsByDate, today }, (err, html) => {
  if (err) {
    console.error('❌ Error rendering index:', err);
    process.exit(1);
  }
  fs.writeFileSync(outputFile, html);
  console.log('✅ index.html generated at', outputFile);
});