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
  if (!html.includes('https://pay.kiwify.com.br/PAIK3uG')) failures.push(`${route}: link do produto ausente`);
  if (!html.includes("fbq('init','4641532832754429')") || !html.includes("fbq('track','PageView')")) {
    failures.push(`${route}: Meta Pixel incompleto`);
  }
}

const thankYouFiles = ['index.html', 'styles.css', 'script.js'].map((name) => path.join(root, 'obrigada', name));
for (const file of thankYouFiles) {
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) failures.push(`obrigada: arquivo ausente ou vazio: ${path.basename(file)}`);
}

if (fs.existsSync(thankYouFiles[0])) {
  const thankYouHtml = fs.readFileSync(thankYouFiles[0], 'utf8');
  for (const text of [
    "fbq('track','Purchase',{currency:'BRL',value:29.90}",
    'https://chat.whatsapp.com/J4MhssWstxg3iABsNHJeVK?s=sh&p=a&mlu=4',
    'ENTRAR NO GRUPO DO WHATSAPP',
    'src="/obrigada/script.js"',
  ]) {
    if (!thankYouHtml.includes(text)) failures.push(`obrigada: conteúdo obrigatório ausente: ${text}`);
  }
}

const conversionApiPath = path.join(root, 'api', 'meta-purchase.js');
if (!fs.existsSync(conversionApiPath)) {
  failures.push('API de conversão ausente');
} else {
  const conversionApi = fs.readFileSync(conversionApiPath, 'utf8');
  if (!conversionApi.includes('process.env.META_CONVERSIONS_TOKEN')) failures.push('API de conversão não usa variável protegida');
  if (conversionApi.includes('EAAW1R1')) failures.push('token de conversão exposto no código');
}

for (const asset of ['lisandra-salete-hero.jpg', 'lisandra-salete-mentoras.jpg', 'lisandra-salete-reconhece.jpg']) {
  const file = path.join(root, 'assets', asset);
  if (!fs.existsSync(file) || fs.statSync(file).size < 10000) failures.push(`asset ausente ou inválido: ${asset}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validação concluída: páginas, Pixel e conversões íntegros.');
