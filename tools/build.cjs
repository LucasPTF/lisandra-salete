const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
execFileSync(process.execPath, [path.join(__dirname, 'convert-elementor.cjs')], { stdio: 'inherit' });
execFileSync(process.execPath, [path.join(__dirname, 'validate.cjs')], { stdio: 'inherit' });

const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const name of ['index.html', 'a1', 'a2', 'a3', 'assets']) {
  fs.cpSync(path.join(root, name), path.join(dist, name), { recursive: true });
}
console.log('Build pronto em dist/.');

