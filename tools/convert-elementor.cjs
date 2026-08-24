const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [
  { route: 'a1', file: 'elementor-a1.json' },
  { route: 'a2', file: 'elementor-a2.json' },
  { route: 'a3', file: 'elementor-a3.json' },
];

const localAssets = new Map([
  ['https://eltonitokazu.com/wp-content/uploads/2026/07/Lisandra-e-Salete-Alta-Qualidade-9.jpg', '../assets/lisandra-salete-hero.jpg'],
  ['https://eltonitokazu.com/wp-content/uploads/2026/07/Lisandra-e-Salete-Alta-Qualidade-22.jpg', '../assets/lisandra-salete-mentoras.jpg'],
]);

const escapeAttr = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const cssValue = (value) => {
  if (value == null || value === '') return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value.size !== 'undefined' && value.size !== '') {
    if (typeof value.size === 'string' && /[a-z%)]$/i.test(value.size.trim())) return value.size;
    return `${value.size}${value.unit && value.unit !== 'custom' ? value.unit : ''}`;
  }
  return '';
};

const boxValue = (box) => {
  if (!box || typeof box !== 'object') return '';
  const toSide = (side) => {
    const value = box[side];
    if (value == null || value === '') return '0';
    if (typeof value === 'number') return `${value}${box.unit && box.unit !== 'custom' ? box.unit : 'px'}`;
    if (/^-?\d+(\.\d+)?$/.test(value)) return `${value}${box.unit && box.unit !== 'custom' ? box.unit : 'px'}`;
    return value;
  };
  return ['top', 'right', 'bottom', 'left'].map(toSide).join(' ');
};

const prop = (settings, name, device) => settings[`${name}${device}`] ?? settings[name];

function commonDeclarations(settings, isContainer, device = '') {
  const prefix = isContainer ? '' : '_';
  const out = [];
  const margin = prop(settings, `${prefix}margin`, device);
  const padding = prop(settings, `${prefix}padding`, device);
  if (margin) out.push(`margin:${boxValue(margin)}`);
  if (padding) out.push(`padding:${boxValue(padding)}`);

  if (isContainer) {
    out.push('display:flex', 'position:relative', 'min-width:0');
    const direction = prop(settings, 'flex_direction', device);
    const wrap = prop(settings, 'flex_wrap', device);
    const align = prop(settings, 'flex_align_items', device);
    const gap = prop(settings, 'flex_gap', device);
    const width = prop(settings, 'width', device);
    if (direction) out.push(`flex-direction:${direction}`);
    if (wrap && wrap !== 'initial') out.push(`flex-wrap:${wrap}`);
    if (align) out.push(`align-items:${align}`);
    if (gap) {
      const gapUnit = gap.unit && gap.unit !== 'custom' ? gap.unit : '';
      const withGapUnit = (value) => {
        if (value == null || value === '') return '';
        if (typeof value === 'string' && /[a-z%)]$/i.test(value.trim())) return value;
        return `${value}${Number(value) === 0 ? '' : gapUnit}`;
      };
      const row = withGapUnit(gap.row ?? gap.size);
      const column = withGapUnit(gap.column ?? gap.size);
      if (row || column) out.push(`gap:${row || 0} ${column || row || 0}`);
    }
    if (width && cssValue(width) && cssValue(width) !== 'auto') out.push(`width:${cssValue(width)}`);
  } else {
    out.push('position:relative', 'min-width:0');
    const widthMode = prop(settings, '_element_width', device);
    const width = prop(settings, '_element_custom_width', device);
    if ((widthMode === 'initial' || widthMode === 'custom') && width && cssValue(width) && cssValue(width) !== 'auto') {
      out.push(`width:${cssValue(width)}`);
    }
  }

  const zIndex = prop(settings, isContainer ? 'z_index' : '_z_index', device);
  if (zIndex !== undefined && zIndex !== '') out.push(`z-index:${zIndex}`);
  const background = prop(settings, isContainer ? 'background_color' : '_background_color', device);
  if (background) out.push(`background-color:${background}`);
  const gradientEnabled = settings.softlite_background_image_enable === 'yes';
  if (gradientEnabled && settings.softlite_background_image_custom) {
    out.push(`background-image:${settings.softlite_background_image_custom}`);
    if (settings.softlite_background_size) out.push(`background-size:${settings.softlite_background_size}`);
  }

  const borderStyle = prop(settings, isContainer ? 'border_border' : '_border_border', device);
  const borderColor = prop(settings, isContainer ? 'border_color' : '_border_color', device);
  const borderWidth = prop(settings, isContainer ? 'border_width' : '_border_width', device);
  const borderRadius = prop(settings, isContainer ? 'border_radius' : '_border_radius', device);
  if (borderStyle) out.push(`border-style:${borderStyle}`);
  if (borderColor) out.push(`border-color:${borderColor}`);
  if (borderWidth) out.push(`border-width:${boxValue(borderWidth)}`);
  if (borderRadius) out.push(`border-radius:${boxValue(borderRadius)}`);
  return out;
}

function typographyDeclarations(settings, prefix = 'typography', device = '') {
  const out = [];
  const size = prop(settings, `${prefix}_font_size`, device);
  const lineHeight = prop(settings, `${prefix}_line_height`, device);
  const letterSpacing = prop(settings, `${prefix}_letter_spacing`, device);
  const weight = prop(settings, `${prefix}_font_weight`, device);
  const transform = prop(settings, `${prefix}_text_transform`, device);
  if (size && cssValue(size)) out.push(`font-size:${cssValue(size)}`);
  if (lineHeight && cssValue(lineHeight)) out.push(`line-height:${cssValue(lineHeight)}`);
  if (letterSpacing && cssValue(letterSpacing)) out.push(`letter-spacing:${cssValue(letterSpacing)}`);
  if (weight) out.push(`font-weight:${weight}`);
  if (transform) out.push(`text-transform:${transform}`);
  return out;
}

function widgetDeclarations(element, device = '') {
  const s = element.settings || {};
  const base = `.elementor-element-${element.id}`;
  const rules = [];
  const common = commonDeclarations(s, false, device);
  if (common.length) rules.push(`${base}{${common.join(';')}}`);

  if (element.widgetType === 'heading') {
    const declarations = typographyDeclarations(s, 'typography', device);
    const color = prop(s, 'title_color', device);
    if (color) declarations.push(`color:${color}`);
    if (declarations.length) rules.push(`${base} .elementor-heading-title{${declarations.join(';')}}`);
  }
  if (element.widgetType === 'text-editor') {
    const declarations = typographyDeclarations(s, 'typography', device);
    const color = prop(s, 'text_color', device);
    const align = prop(s, 'align', device);
    if (color) declarations.push(`color:${color}`);
    if (align) declarations.push(`text-align:${align}`);
    if (declarations.length) rules.push(`${base} .elementor-widget-container{${declarations.join(';')}}`);
  }
  if (element.widgetType === 'button') {
    const declarations = typographyDeclarations(s, 'typography', device);
    const padding = prop(s, 'text_padding', device);
    const radius = prop(s, 'border_radius', device);
    const width = prop(s, 'border_width', device);
    const borderStyle = prop(s, 'border_border', device);
    const color = prop(s, 'button_text_color', device);
    const background = prop(s, 'background_color', device);
    if (padding) declarations.push(`padding:${boxValue(padding)}`);
    if (radius) declarations.push(`border-radius:${boxValue(radius)}`);
    if (borderStyle) declarations.push(`border-style:${borderStyle}`);
    if (s.border_color) declarations.push(`border-color:${s.border_color}`);
    if (width) declarations.push(`border-width:${boxValue(width)}`);
    if (color) declarations.push(`color:${color}`);
    if (background) declarations.push(`background-color:${background}`);
    if (s.softlite_background_image_enable === 'yes' && s.softlite_background_image_custom) {
      declarations.push(`background-image:${s.softlite_background_image_custom}`);
    }
    if (declarations.length) rules.push(`${base} .elementor-button{${declarations.join(';')}}`);
  }
  if (element.widgetType === 'softlite_image') {
    const width = prop(s, 'width', device);
    if (width && cssValue(width)) rules.push(`${base}{width:${cssValue(width)}}`);
  }
  return rules.join('\n');
}

function elementStyles(element) {
  const s = element.settings || {};
  const base = `.elementor-element-${element.id}`;
  const blocks = [];
  if (!element.widgetType) {
    const declarations = commonDeclarations(s, true, '');
    if (declarations.length) blocks.push(`${base}{${declarations.join(';')}}`);
    const tablet = commonDeclarations(s, true, '_tablet');
    const mobile = commonDeclarations(s, true, '_mobile');
    if (tablet.length) blocks.push(`@media(max-width:1024px){${base}{${tablet.join(';')}}}`);
    if (mobile.length) blocks.push(`@media(max-width:767px){${base}{${mobile.join(';')}}}`);
  } else {
    blocks.push(widgetDeclarations(element, ''));
    blocks.push(`@media(max-width:1024px){${widgetDeclarations(element, '_tablet')}}`);
    blocks.push(`@media(max-width:767px){${widgetDeclarations(element, '_mobile')}}`);
  }
  for (const key of ['_custom_css', 'custom_css']) {
    if (typeof s[key] === 'string' && s[key].trim()) {
      blocks.push(s[key].replace(/\bselector\b/g, base));
    }
  }
  for (const child of element.elements || []) blocks.push(elementStyles(child));
  return blocks.filter(Boolean).join('\n');
}

function localizeUrl(url) {
  return localAssets.get(url) || url || '';
}

function iconHtml(settings) {
  if (settings.selected_icon_source === 'svg' && settings.selected_icon_svg) return settings.selected_icon_svg;
  const imageUrl = settings.selected_icon_image?.url;
  if (imageUrl) {
    return `<img src="${escapeAttr(localizeUrl(imageUrl))}" alt="Salete e Lisandra" class="${escapeAttr(settings.selected_icon_image_class || 'softlite-dynamic-icon')}">`;
  }
  if (settings.selected_icon_image_source === 'external') {
    return '<span class="softlite-wordmark">Voltar Pra Si</span>';
  }
  return '<span class="softlite-dynamic-icon" aria-hidden="true">✓</span>';
}

function renderDynamic(settings) {
  let html = settings.dynamic_template || '';
  for (const [key, value] of Object.entries(settings)) {
    if (typeof value !== 'string' && typeof value !== 'number') continue;
    const token = new RegExp(`\\{\\{\\s*settings\\.${key}(?:\\|raw)?\\s*\\}\\}`, 'g');
    html = html.replace(token, String(value));
  }
  const link = settings.link?.url || '#';
  html = html
    .replace(/\{\{\s*iconDynamicHTML\|raw\s*\}\}/g, iconHtml(settings))
    .replace(/\{\{\s*settings\.link\.url\s*\}\}/g, escapeAttr(link))
    .replace(/\{\{\s*settings\.link_click\s*==\s*'box'\s*\?\s*settings\.link\.url\s*:\s*''\s*\}\}/g, escapeAttr(link))
    .replace(/\{\{\s*settings\.link\.is_external\s*\?\s*'_blank'\s*:\s*''\s*\}\}/g, settings.link?.is_external ? '_blank' : '')
    .replace(/\{%\s*if\s+settings\.link\s*%\}/g, '')
    .replace(/\{%\s*endif\s*%\}/g, '')
    .replace(/data-softlite-card-box-link-href=/g, 'data-softlite-card-box-link-href=')
    .replace(/data-softlite-card-box-link-/g, 'data-softlite-card-box-link-')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/\{%[^%]+%\}/g, '');
  return html;
}

function classes(element) {
  const extra = element.settings?.css_classes || '';
  const type = element.widgetType ? `elementor-widget elementor-widget-${element.widgetType}` : 'e-con';
  return `elementor-element elementor-element-${element.id} ${type} ${extra}`.trim();
}

function renderElement(element) {
  const s = element.settings || {};
  const id = s._element_id ? ` id="${escapeAttr(s._element_id)}"` : '';
  const cls = escapeAttr(classes(element));
  if (!element.widgetType) {
    const tag = /^(section|main|header|footer|article|aside|nav)$/.test(s.html_tag || '') ? s.html_tag : 'div';
    return `<${tag}${id} class="${cls}">${(element.elements || []).map(renderElement).join('')}</${tag}>`;
  }
  if (element.widgetType === 'heading') {
    const tag = /^h[1-6]$/.test(s.header_size || '') ? s.header_size : 'h2';
    return `<div${id} class="${cls}"><${tag} class="elementor-heading-title">${s.title || ''}</${tag}></div>`;
  }
  if (element.widgetType === 'text-editor') {
    return `<div${id} class="${cls}"><div class="elementor-widget-container">${s.editor || ''}</div></div>`;
  }
  if (element.widgetType === 'button') {
    const link = s.link?.url || '#';
    const target = s.link?.is_external ? ' target="_blank" rel="noopener"' : '';
    return `<div${id} class="${cls}"><div class="elementor-widget-container"><a class="elementor-button" href="${escapeAttr(link)}"${target}>${s.text || ''}</a></div></div>`;
  }
  if (element.widgetType === 'softlite_image') {
    const url = localizeUrl(s.image?.url || s.image_external_url);
    const alt = s.image?.alt || 'Lisandra Klein e Salete Gervasoni';
    return `<div${id} class="${cls}"><div class="elementor-widget-container elementor-image"><img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="eager"></div></div>`;
  }
  if (element.widgetType === 'softlite_dynamic_card_box') {
    return `<div${id} class="${cls}"><div class="elementor-widget-container">${renderDynamic(s)}</div></div>`;
  }
  if (element.widgetType === 'html') return `<div${id} class="${cls}">${s.html || ''}</div>`;
  return `<div${id} class="${cls}"></div>`;
}

function pageTitle(route, json) {
  const heroByRoute = {
    a1: 'Você dá conta de tudo — Diagnóstico da Mulher que Dá Conta de Tudo',
    a2: 'Dar conta de tudo nem sempre é força — Diagnóstico da Mulher que Dá Conta de Tudo',
    a3: 'Em 4 horas, entenda por que você carrega tanto — Diagnóstico da Mulher que Dá Conta de Tudo',
  };
  return heroByRoute[route] || json.title;
}

function generatePage(route, json) {
  const css = `${baseCss}\n${json.content.map(elementStyles).join('\n')}`;
  const html = json.content.map(renderElement).join('\n');
  const title = pageTitle(route, json);
  const description = 'Workshop ao vivo de 4 horas para enxergar o padrão, aliviar a culpa e iniciar o primeiro movimento de volta para si.';
  const document = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#160b12">
  <title>${escapeAttr(title)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:image" content="/assets/og-lisandra-salete.png">
  <link rel="preload" as="image" href="../assets/lisandra-salete-hero.jpg">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="elementor-page" data-angle="${route}">${html}</main>
  <script src="script.js" defer></script>
</body>
</html>`;
  const out = path.join(root, route);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'index.html'), document);
  fs.writeFileSync(path.join(out, 'styles.css'), css);
  fs.writeFileSync(path.join(out, 'script.js'), behaviorJs);
}

const baseCss = `
:root{color-scheme:dark;--page:#1a1014;--ink:#f4ece6;--gold:#d9ae5a}
*{box-sizing:border-box}
html{scroll-behavior:smooth;background:var(--page)}
body{margin:0;background:var(--page);color:var(--ink);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img,svg{display:block;max-width:100%}
img{height:auto}
a{color:inherit;text-decoration:none}
button,a{font:inherit}
h1,h2,h3,h4,h5,h6,p{margin-top:0}
.elementor-page,.elementor-element{min-width:0}
.elementor-page{overflow:hidden}
.e-con{width:100%}
.elementor-widget-container{width:100%}
.elementor-heading-title{margin:0;font-family:Manrope,"Plus Jakarta Sans",system-ui,sans-serif}
.elementor-button{display:inline-flex;align-items:center;justify-content:center;border:0;cursor:pointer}
.elementor-image{height:100%}
.elementor-image img{width:100%;height:100%;object-fit:cover}
.softlite-dynamic-icon{flex:0 0 auto}
.softlite-wordmark{font-family:Manrope,system-ui,sans-serif;font-weight:800;color:#dbcac1}
a:focus-visible,button:focus-visible{outline:3px solid var(--gold)!important;outline-offset:4px}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition:none!important}}
`;

const behaviorJs = `
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('button[aria-expanded]');
  if (!trigger) return;
  const expanded = trigger.getAttribute('aria-expanded') === 'true';
  const group = trigger.closest('[id="faq"], .elementor-element');
  if (group) {
    group.querySelectorAll('button[aria-expanded="true"]').forEach((button) => {
      if (button !== trigger) button.setAttribute('aria-expanded', 'false');
    });
  }
  trigger.setAttribute('aria-expanded', String(!expanded));
});

document.querySelectorAll('[data-softlite-card-box-link-href]').forEach((box) => {
  const href = box.getAttribute('data-softlite-card-box-link-href');
  if (!href || href === '#') return;
  box.setAttribute('role', 'link');
  box.setAttribute('tabindex', '0');
  const open = () => location.href = href;
  box.addEventListener('click', (event) => { if (!event.target.closest('a,button')) open(); });
  box.addEventListener('keydown', (event) => { if (event.key === 'Enter') open(); });
});
`;

for (const page of pages) {
  const source = path.join(root, 'source-json', page.file);
  if (!fs.existsSync(source)) throw new Error(`Arquivo ausente: ${source}`);
  generatePage(page.route, JSON.parse(fs.readFileSync(source, 'utf8')));
}

console.log('Elementor convertido: a1, a2 e a3.');
