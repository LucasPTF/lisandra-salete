const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const routes = ['a1', 'a2', 'a3'];
const failures = [];

for (const route of routes) {
  const htmlPath = path.join(root, route, 'index.html');
  const cssPath = path.join(root, route, 'styles.css');
  const jsPath = path.join(root, route, 'script.js');
  for (const file of [htmlPath, cssPath, jsPath]) {
    if (!fs.existsSync(file) || fs.statSync(file).size === 0) failures.push(`${route}: arquivo ausente ou vazio: ${path.basename(file)}`);
  }
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const required = ['Diagnóstico da Mulher que Dá Conta de Tudo', 'Salete', 'Lisandra', 'R$29,90', 'id="oferta"', 'id="faq"'];
  for (const text of required) if (!html.includes(text)) failures.push(`${route}: conteúdo obrigatório ausente: ${text}`);
  if (/\{\{|\{%|settings\./.test(html)) failures.push(`${route}: placeholder do Elementor não resolvido`);
  if (!html.includes('<main') || !html.includes('</main>')) failures.push(`${route}: estrutura principal inválida`);
}

for (const asset of ['lisandra-salete-hero.jpg', 'lisandra-salete-mentoras.jpg']) {
  const file = path.join(root, 'assets', asset);
  if (!fs.existsSync(file) || fs.statSync(file).size < 10000) failures.push(`asset ausente ou inválido: ${asset}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validação concluída: três páginas e assets íntegros.');

