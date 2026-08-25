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
  const required = [
    'Diagnóstico da Mulher que Dá Conta de Tudo',
    'Lisandra Klein',
    'Salete Gervasoni',
    'Professoras e Terapeutas Sistêmicas Integrativas',
    'Você se <em>reconhece?</em>',
    'O que pode estar por trás desse',
    'Práticas e vivências sistêmicas',
    'R$ 29,90',
    'PRÓXIMO LOTE',
    'Ficou alguma <em>dúvida?</em>',
    'id="oferta"',
    'id="faq"',
  ];
  for (const text of required) if (!html.includes(text)) failures.push(`${route}: conteúdo obrigatório ausente: ${text}`);
  const forbidden = [
    'Antes e depois',
    'Talvez não seja se',
    'Sem garantia adicional informada',
    'A transformação profunda continua na mentoria',
    'Salete Verenice Soares Gervasoni',
    'Padrão › Clareza › Reconexão › Voltar para si',
  ];
  for (const text of forbidden) if (html.includes(text)) failures.push(`${route}: conteúdo removido ainda presente: ${text}`);
  const primaryCtas = (html.match(/QUERO GARANTIR MINHA VAGA/g) || []).length;
  if (primaryCtas < 4) failures.push(`${route}: quantidade insuficiente de CTAs principais`);
  const primaryHeadings = (html.match(/<h1>/g) || []).length;
  if (primaryHeadings !== 1) failures.push(`${route}: a hero deve ter exatamente um H1`);
  if (!html.includes('<h2 class="hero-subheadline">')) failures.push(`${route}: complemento H2 da hero ausente`);
  const purchaseConditions = (html.match(/A compra segue as condições da plataforma de pagamento utilizada\./g) || []).length;
  if (purchaseConditions !== 1) failures.push(`${route}: condições da compra devem aparecer uma única vez`);
  if (/\{\{|\{%|settings\./.test(html)) failures.push(`${route}: placeholder do Elementor não resolvido`);
  if (!html.includes('<main') || !html.includes('</main>')) failures.push(`${route}: estrutura principal inválida`);
  if (!html.includes(`href="/${route}/styles.css"`)) failures.push(`${route}: caminho absoluto do CSS ausente`);
  if (!html.includes(`src="/${route}/script.js"`)) failures.push(`${route}: caminho absoluto do JavaScript ausente`);
}

for (const asset of ['lisandra-salete-hero.jpg', 'lisandra-salete-mentoras.jpg', 'lisandra-salete-reconhece.jpg']) {
  const file = path.join(root, 'assets', asset);
  if (!fs.existsSync(file) || fs.statSync(file).size < 10000) failures.push(`asset ausente ou inválido: ${asset}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validação concluída: três páginas e assets íntegros.');
