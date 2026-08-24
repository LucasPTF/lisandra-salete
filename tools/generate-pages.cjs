const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const checkoutUrl = '#oferta';

const angles = {
  a1: {
    title: 'Você dá conta de tudo. Mas quem está cuidando de você?',
    headline: 'Você dá conta de tudo.<br><em>Mas quem está cuidando de você?</em>',
  },
  a2: {
    title: 'Dar conta de tudo nem sempre é força',
    headline: 'Dar conta de tudo nem sempre é força.<br><em>Às vezes, é autoabandono.</em>',
  },
  a3: {
    title: 'Em 4 horas, entenda por que você carrega tanto',
    headline: 'Em 4 horas, você vai entender <em>por que carrega tanto</em>',
  },
};

const faq = [
  ['Vou precisar me expor?', 'Não. Você poderá participar das práticas e vivências respeitando seus próprios limites.'],
  ['Isso é terapia?', 'Não. É um workshop de autoconhecimento com práticas e vivências guiadas.'],
  ['Em 4 horas dá para mudar alguma coisa?', 'É possível ampliar a percepção, compreender padrões e vivenciar novos movimentos. Cada pessoa terá sua própria experiência.'],
  ['E se eu já tentei outras coisas?', 'A proposta é oferecer um olhar diferente, incluindo uma perspectiva sistêmica sobre padrões que podem aparecer na sua vida.'],
  ['Vou conseguir acompanhar?', 'Sim. As práticas e vivências serão conduzidas passo a passo.'],
];

const cta = (label = 'QUERO GARANTIR MINHA VAGA', className = '') =>
  `<a class="button ${className}" href="${checkoutUrl}"><span>${label}</span><b aria-hidden="true">→</b></a>`;

function renderPage(route, angle) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#160b12">
  <title>${angle.title} — Diagnóstico da Mulher que Dá Conta de Tudo</title>
  <meta name="description" content="Workshop ao vivo de 4 horas com diagnóstico guiado, práticas e vivências sistêmicas conduzido por Lisandra Klein e Salete Gervasoni.">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="Diagnóstico da Mulher que Dá Conta de Tudo">
  <meta property="og:description" content="Online, ao vivo e com 4 horas de práticas e vivências guiadas.">
  <meta property="og:image" content="/assets/og-lisandra-salete.png">
  <link rel="preload" as="image" href="../assets/lisandra-salete-hero.jpg">
  <link rel="stylesheet" href="/${route}/styles.css">
</head>
<body data-angle="${route}">
  <header class="topbar">
    <a class="brand" href="#topo" aria-label="Ir ao início">
      <span class="brand-mark">LS</span>
      <span><strong>DIAGNÓSTICO</strong><small>DA MULHER QUE DÁ CONTA DE TUDO</small></span>
    </a>
    <a class="top-cta" href="${checkoutUrl}">GARANTIR VAGA <span aria-hidden="true">→</span></a>
  </header>

  <main>
    <section class="hero" id="topo">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow"><i></i> WORKSHOP ONLINE E AO VIVO</p>
        <h1>${angle.headline}</h1>
        <p class="hero-lead">Um workshop ao vivo para mulheres que estão cansadas de sustentar tudo sozinhas e querem compreender o que pode estar por trás dessa necessidade de dar conta de tudo.</p>
        <div class="hero-facts" aria-label="Informações do workshop">
          <span>4 horas ao vivo</span><i></i><span>Diagnóstico guiado</span><i></i><span>Vivências sistêmicas</span>
        </div>
        <div class="hero-action">
          ${cta()}
          <p><small>1º LOTE</small><strong>R$ 29,90</strong></p>
        </div>
      </div>
      <figure class="hero-photo">
        <img src="../assets/lisandra-salete-hero.jpg" alt="Lisandra Klein e Salete Gervasoni" width="1365" height="2048">
        <figcaption>Lisandra Klein <span>&amp;</span> Salete Gervasoni</figcaption>
      </figure>
    </section>

    <section class="recognition section" id="reconhece">
      <div class="recognition-photo">
        <img src="../assets/lisandra-salete-mentoras.jpg" alt="Lisandra Klein e Salete Gervasoni juntas" loading="lazy" width="2048" height="1365">
        <div class="photo-tag">UM OLHAR PARA<br>O QUE VOCÊ CARREGA</div>
      </div>
      <div class="recognition-copy">
        <p class="section-label"><span>01</span> IDENTIFICAÇÃO</p>
        <h2>Você se <em>reconhece?</em></h2>
        <ul class="check-list">
          <li>Diz “sim” quando queria dizer “não”.</li>
          <li>Sente que se você não fizer, ninguém faz.</li>
          <li>Resolve os problemas de todos e deixa os seus para depois.</li>
          <li>Tem dificuldade de pedir ajuda e delegar.</li>
          <li>Sente culpa quando para ou descansa.</li>
          <li>Está cansada, sobrecarregada e, às vezes, sente um vazio que nem sabe explicar.</li>
        </ul>
        <div class="recognition-close">
          <p>Talvez não seja apenas excesso de tarefas.</p>
          <strong>Pode existir algo por trás dessa necessidade de dar conta de tudo.</strong>
        </div>
      </div>
    </section>

    <section class="behind section" id="descobrir">
      <div class="section-heading">
        <div>
          <p class="section-label light"><span>02</span> UM NOVO OLHAR</p>
          <h2>O que pode estar por trás desse <em>“eu dou conta”?</em></h2>
        </div>
        <p>Compreender o padrão é o começo de um movimento mais consciente — sem exigir que você mude tudo de uma vez.</p>
      </div>
      <div class="discovery-grid">
        <article><span>01</span><h3>Por que você sente que precisa resolver tudo</h3><p>Entenda o que pode ter feito você aprender que precisava ser forte e dar conta.</p></article>
        <article><span>02</span><h3>Por que pedir ajuda parece tão difícil</h3><p>Perceba por que você consegue cuidar de todos, mas tem dificuldade de permitir que cuidem de você.</p></article>
        <article><span>03</span><h3>Por que dizer “não” traz culpa</h3><p>Compreenda o que pode estar por trás da dificuldade de colocar limites e considerar também as suas necessidades.</p></article>
        <article><span>04</span><h3>Vivências sistêmicas</h3><p>Experimente um olhar além do racional para perceber esses padrões e abrir espaço para novos movimentos.</p></article>
      </div>
      <div class="center-cta">${cta('QUERO PARTICIPAR DO WORKSHOP')}</div>
    </section>

    <section class="for-you section">
      <div class="for-you-card">
        <p class="section-label"><span>03</span> PARA QUEM É</p>
        <h2>Este workshop é para você que…</h2>
        <p class="for-you-lead">Se reconheceu nessa mulher que tenta dar conta de tudo, está cansada de repetir esse padrão e quer compreender o que pode existir por trás dele.</p>
        <div class="no-exposure"><span aria-hidden="true">✓</span><div><strong>Sem exposição.</strong><p>Você participa das práticas e vivências no seu ritmo e respeitando seus limites.</p></div></div>
      </div>
    </section>

    <section class="offer section" id="oferta">
      <div class="offer-copy">
        <p class="section-label light"><span>04</span> 1º LOTE ABERTO</p>
        <h2>Talvez você não precise aprender a <em>dar conta de mais.</em></h2>
        <p class="offer-message">Talvez precise compreender por que sente que precisa dar conta de tudo.</p>
        <h3>DIAGNÓSTICO DA MULHER QUE DÁ CONTA DE TUDO</h3>
        <p class="you-get">VOCÊ TERÁ:</p>
        <ul class="offer-list">
          <li>Workshop ao vivo — 4 horas</li>
          <li>Diagnóstico guiado</li>
          <li>Práticas e vivências sistêmicas</li>
          <li>Grupo de WhatsApp</li>
          <li>Replay por 3 dias</li>
          <li>Materiais exclusivos</li>
        </ul>
      </div>
      <aside class="price-card">
        <p class="price-label">1º LOTE <span>VOCÊ ESTÁ AQUI</span></p>
        <div class="price"><small>R$</small><strong>29</strong><sup>,90</sup></div>
        <div class="price-jump"><span>AGORA <b>R$ 29,90</b></span><i>→</i><span>PRÓXIMO LOTE <b>R$ 97</b></span></div>
        <p class="event-line">Online <i></i> Ao vivo <i></i> 4 horas <i></i> Replay por 3 dias</p>
        ${cta('QUERO GARANTIR MINHA VAGA', 'button-full')}
        <p class="third-lot">3º lote: R$ 197</p>
        <small class="purchase-note">A compra segue as condições da plataforma de pagamento utilizada.</small>
      </aside>
    </section>

    <section class="hosts section">
      <div class="hosts-image">
        <img src="../assets/lisandra-salete-mentoras.jpg" alt="Lisandra Klein e Salete Gervasoni, professoras e terapeutas sistêmicas integrativas" loading="lazy" width="2048" height="1365">
        <div class="hosts-badge"><strong>2</strong><span>PROFISSIONAIS<br>COM VOCÊ</span></div>
      </div>
      <div class="hosts-copy">
        <p class="section-label"><span>05</span> QUEM CONDUZ</p>
        <h2>Quem estará com você <em>nessa experiência</em></h2>
        <h3>Lisandra Klein e Salete Gervasoni</h3>
        <p class="hosts-role">Professoras e Terapeutas Sistêmicas Integrativas</p>
        <p>Duas profissionais que unem a experiência da educação ao olhar terapêutico e sistêmico para compreender padrões, relações e movimentos que atravessam a vida das mulheres.</p>
        <p>Além da formação e experiência profissional, Lisandra e Salete também conhecem, em suas próprias histórias, o que significa assumir responsabilidades, atravessar desafios e perceber a importância de olhar para si.</p>
        <p>Hoje, integram visão sistêmica, constelação, hipnose, PNL, neurociência e práticas integrativas em uma condução acolhedora, respeitosa e voltada à ampliação da consciência.</p>
        <p>No workshop <strong>Diagnóstico da Mulher que Dá Conta de Tudo</strong>, conduzirão práticas e vivências sistêmicas para ajudar você a perceber o que pode estar por trás da necessidade de sustentar, resolver e dar conta de tudo.</p>
      </div>
    </section>

    <section class="receive section">
      <div class="section-heading receive-heading">
        <div><p class="section-label light"><span>06</span> ENTREGAS</p><h2>Tudo o que você recebe <em>ao participar</em></h2></div>
      </div>
      <div class="receive-grid">
        <article><span>01</span><h3>Workshop ao vivo de 4 horas</h3><p>Um encontro para olhar para os padrões que sustentam o “dar conta de tudo”.</p></article>
        <article><span>02</span><h3>Diagnóstico guiado</h3><p>Para identificar onde esse padrão aparece na sua vida.</p></article>
        <article><span>03</span><h3>Práticas e vivências sistêmicas</h3><p>Para ampliar a percepção sobre padrões, relações e movimentos que podem estar por trás da sobrecarga.</p></article>
        <article><span>04</span><h3>Grupo de WhatsApp</h3><p>Orientações, lembretes e suporte durante o workshop.</p></article>
        <article><span>05</span><h3>Replay por 3 dias</h3><p>Para rever o conteúdo com calma.</p></article>
        <article class="materials"><span>+</span><h3>Materiais exclusivos</h3><ul><li>Mapa da Mulher que Dá Conta de Tudo</li><li>Áudio Guiado — De Volta Para Si</li><li>Checklist dos Autossabotadores Emocionais</li></ul></article>
      </div>
      <div class="center-cta">${cta()}</div>
    </section>

    <section class="faq section" id="faq">
      <div class="faq-title">
        <p class="section-label"><span>07</span> FAQ</p>
        <h2>Ficou alguma <em>dúvida?</em></h2>
        <p>Reunimos aqui as respostas mais importantes antes de você garantir sua vaga.</p>
      </div>
      <div class="faq-list">
        ${faq.map(([question, answer], index) => `<details${index === 0 ? ' open' : ''}><summary><span>${question}</span><i aria-hidden="true">+</i></summary><p>${answer}</p></details>`).join('')}
      </div>
    </section>

    <section class="final section">
      <div class="final-grid" aria-hidden="true"></div>
      <div class="final-content">
        <p class="section-label light"><span>08</span> SUA ESCOLHA</p>
        <h2>Você não precisa continuar sendo a última da sua própria lista.</h2>
        <p>Talvez você não precise fazer mais.<br><strong>Talvez precise compreender por que sente que precisa dar conta de tudo.</strong></p>
        <h3>DIAGNÓSTICO DA MULHER QUE DÁ CONTA DE TUDO</h3>
        <div class="final-meta"><span>Online</span><i></i><span>Ao vivo</span><i></i><span>4 horas</span></div>
        <div class="final-offer"><span>1º LOTE</span><strong>R$ 29,90</strong></div>
        ${cta()}
      </div>
    </section>
  </main>

  <footer>
    <div><strong>DIAGNÓSTICO DA MULHER QUE DÁ CONTA DE TUDO</strong><p>Workshop de autoconhecimento com práticas e vivências sistêmicas guiadas.</p></div>
    <p>Lisandra Klein e Salete Gervasoni<br>Professoras e Terapeutas Sistêmicas Integrativas</p>
    <small>© 2026 · Lisandra Klein e Salete Gervasoni</small>
  </footer>

  <div class="mobile-buy"><span><small>1º LOTE</small><strong>R$ 29,90</strong></span><a href="${checkoutUrl}">QUERO MINHA VAGA <b aria-hidden="true">→</b></a></div>
  <script src="/${route}/script.js" defer></script>
</body>
</html>`;
}

const css = `
:root{--ink:#f6eee8;--muted:#c9b8b2;--soft:#a1988c;--dark:#160b12;--dark2:#1a1014;--wine:#24111b;--rose:#a63a62;--rose2:#7b2549;--gold:#d9ae5a;--gold2:#8a5e2c;--line:rgba(244,236,230,.14);--max:1180px}
*{box-sizing:border-box}html{scroll-behavior:smooth;background:var(--dark)}body{margin:0;background:var(--dark);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}main{overflow:clip}a{color:inherit;text-decoration:none}img{display:block;width:100%;height:100%;object-fit:cover}h1,h2,h3,p{margin-top:0}h1,h2,h3{font-family:Manrope,Inter,ui-sans-serif,system-ui,sans-serif}.section{padding:112px max(24px,calc((100vw - var(--max))/2))}.section-label{display:flex;align-items:center;gap:12px;margin-bottom:30px;color:var(--gold2);font-size:.63rem;font-weight:900;letter-spacing:.17em}.section-label span{width:35px;height:35px;display:grid;place-items:center;border:1px solid rgba(138,94,44,.38);border-radius:50%;color:var(--rose2)}.section-label.light{color:#a99a94}.section-label.light span{color:var(--gold);border-color:rgba(217,174,90,.32)}h2{margin-bottom:0;font-size:clamp(2.8rem,5.2vw,5.7rem);font-weight:760;line-height:.98;letter-spacing:-.062em;text-wrap:balance}h2 em{color:var(--gold);font-family:Georgia,serif;font-weight:400}.button{width:fit-content;min-height:62px;padding:10px 13px 10px 25px;display:inline-flex;align-items:center;justify-content:space-between;gap:28px;background:linear-gradient(135deg,var(--rose2),var(--rose) 62%,var(--gold2) 150%);border:1px solid rgba(255,255,255,.16);border-radius:999px;box-shadow:0 18px 44px -18px rgba(166,58,98,.8);font-size:.72rem;font-weight:950;letter-spacing:.05em;transition:.2s}.button b{width:38px;height:38px;display:grid;place-items:center;color:var(--dark);background:var(--gold);border-radius:50%;font-size:1rem}.button:hover{transform:translateY(-3px);box-shadow:0 24px 55px -18px rgba(166,58,98,.95)}.button:focus-visible,a:focus-visible,summary:focus-visible{outline:3px solid var(--gold);outline-offset:4px}.button-full{width:100%}.center-cta{margin-top:52px;display:flex;justify-content:center}
.topbar{position:absolute;z-index:30;top:0;left:0;right:0;min-height:82px;padding:14px max(24px,calc((100vw - var(--max))/2));display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(244,236,230,.12);background:linear-gradient(to bottom,rgba(15,6,12,.84),transparent)}.brand{display:flex;align-items:center;gap:12px}.brand-mark{width:43px;height:43px;display:grid;place-items:center;color:var(--gold);border:1px solid rgba(217,174,90,.45);border-radius:50%;font:900 .65rem ui-monospace,monospace}.brand>span:last-child{display:grid}.brand strong{font-size:.72rem;letter-spacing:.15em}.brand small{margin-top:3px;color:#9f918d;font-size:.42rem;font-weight:800;letter-spacing:.1em}.top-cta{display:flex;align-items:center;gap:12px;color:var(--gold);font-size:.62rem;font-weight:900;letter-spacing:.08em}.top-cta span{width:29px;height:29px;display:grid;place-items:center;border:1px solid rgba(217,174,90,.45);border-radius:50%}
.hero{position:relative;min-height:900px;padding:128px max(24px,calc((100vw - var(--max))/2)) 72px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(380px,.82fr);align-items:center;gap:30px;background:radial-gradient(circle at 80% 42%,rgba(166,58,98,.2),transparent 32%),linear-gradient(135deg,#1a1014,#0d070b)}.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(217,174,90,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(217,174,90,.055) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(90deg,#000,transparent 78%)}.hero-copy{position:relative;z-index:3}.eyebrow{display:flex;align-items:center;gap:11px;margin-bottom:24px;color:#cbbab3;font-size:.64rem;font-weight:900;letter-spacing:.16em}.eyebrow i{width:9px;height:9px;background:var(--gold);border-radius:50%;box-shadow:0 0 0 6px rgba(217,174,90,.1)}.hero h1{max-width:790px;margin-bottom:25px;font-size:clamp(3.7rem,6vw,6.8rem);font-weight:800;line-height:.91;letter-spacing:-.075em;text-wrap:balance}.hero h1 em{color:var(--gold);font-family:Georgia,serif;font-weight:400}.hero-lead{max-width:690px;margin-bottom:25px;color:#d6c6c0;font-size:1.05rem;line-height:1.72}.hero-facts{max-width:690px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;color:#c3b2ad;font-size:.68rem;font-weight:750}.hero-facts i,.event-line i,.final-meta i{width:5px;height:5px;background:var(--gold2);border-radius:50%}.hero-action{margin-top:32px;display:flex;align-items:center;gap:28px}.hero-action>p{margin:0;padding-left:25px;display:grid;border-left:1px solid var(--line)}.hero-action small{color:#978985;font-size:.49rem;font-weight:900;letter-spacing:.13em}.hero-action strong{margin-top:2px;color:var(--gold);font-size:1.45rem;letter-spacing:-.04em}.hero-photo{position:relative;z-index:2;height:690px;margin:0;align-self:end;overflow:hidden}.hero-photo img{object-position:center 26%;filter:saturate(.92)}.hero-photo:before{content:"";position:absolute;z-index:1;inset:0;background:linear-gradient(90deg,#0e080c 0%,transparent 29%),linear-gradient(0deg,#0e080c 0%,transparent 24%)}.hero-photo figcaption{position:absolute;z-index:2;right:20px;bottom:20px;color:white;font-size:.65rem;font-weight:900;letter-spacing:.1em}.hero-photo figcaption span{color:var(--gold);margin:0 7px}
.recognition{display:grid;grid-template-columns:.82fr 1fr;gap:100px;align-items:center;background:#efe7e1;color:#23151d}.recognition-photo{position:relative;height:710px;overflow:hidden;background:#26151d}.recognition-photo img{object-position:52% center}.photo-tag{position:absolute;right:0;bottom:0;padding:24px 27px;color:white;background:var(--rose2);font-size:.58rem;font-weight:900;letter-spacing:.12em;line-height:1.55}.recognition-copy h2{font-size:clamp(3rem,4.6vw,5rem)}.check-list{margin:42px 0 0;padding:0;list-style:none;border-top:1px solid #cdbfc5}.check-list li{min-height:65px;padding:16px 0;display:flex;align-items:center;gap:15px;border-bottom:1px solid #cdbfc5;color:#53434b;font-size:.87rem;line-height:1.55}.check-list li:before{content:"✓";width:29px;height:29px;flex:0 0 29px;display:grid;place-items:center;color:white;background:var(--rose2);border-radius:50%;font-size:.72rem;font-weight:900}.recognition-close{margin-top:32px;padding:22px 0;border-block:1px solid #cdbfc5}.recognition-close p{margin-bottom:7px;color:#75666d}.recognition-close strong{color:var(--rose2);font-family:Georgia,serif;font-size:1.35rem;line-height:1.4}
.behind{background:#180d13}.section-heading{display:grid;grid-template-columns:1.2fr .55fr;gap:100px;align-items:end}.section-heading>p{margin:0;color:#a99a94;line-height:1.75}.discovery-grid{margin-top:65px;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line)}.discovery-grid article{min-height:360px;padding:25px;display:flex;flex-direction:column;border-right:1px solid var(--line);background:linear-gradient(160deg,rgba(166,58,98,.09),transparent 50%)}.discovery-grid article:last-child{border-right:0}.discovery-grid article>span{color:var(--gold);font-size:.63rem;font-weight:900}.discovery-grid h3{margin:auto 0 15px;font-size:1.45rem;line-height:1.15;letter-spacing:-.04em}.discovery-grid p{margin:0;color:#a99a94;font-size:.78rem;line-height:1.7}
.for-you{color:#281820;background:#e9dfd8}.for-you-card{max-width:920px;margin:auto;text-align:center}.for-you-card .section-label{justify-content:center}.for-you h2{font-size:clamp(2.8rem,4.4vw,4.6rem)}.for-you-lead{max-width:780px;margin:30px auto 0;color:#685860;font-size:1.05rem;line-height:1.8}.no-exposure{max-width:720px;margin:42px auto 0;padding:25px 30px;display:flex;align-items:flex-start;gap:19px;text-align:left;color:white;background:#25131d}.no-exposure>span{width:37px;height:37px;flex:0 0 37px;display:grid;place-items:center;color:var(--dark);background:var(--gold);border-radius:50%;font-weight:900}.no-exposure strong{color:var(--gold);font-size:.88rem}.no-exposure p{margin:5px 0 0;color:#cbbab3;font-size:.8rem;line-height:1.65}
.offer{display:grid;grid-template-columns:1fr .66fr;gap:95px;align-items:center;background:#160b12}.offer h2{font-size:clamp(3rem,4.7vw,5.2rem)}.offer-message{max-width:650px;margin:28px 0 34px;color:#cbbab3;font-size:1.03rem;line-height:1.75}.offer-copy>h3{max-width:630px;padding:20px 0;border-block:1px solid var(--line);color:var(--gold);font-size:.8rem;letter-spacing:.12em;line-height:1.5}.you-get{margin:30px 0 13px;color:#827672;font-size:.52rem;font-weight:900;letter-spacing:.14em}.offer-list{margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:0 25px;list-style:none}.offer-list li{min-height:52px;padding:13px 0;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--line);color:#c9b8b2;font-size:.77rem}.offer-list li:before{content:"✓";color:var(--gold);font-weight:900}.price-card{padding:36px;color:white;background:linear-gradient(155deg,#301624,#1a0d14 65%);border:1px solid rgba(217,174,90,.2);box-shadow:0 42px 90px -42px #000}.price-label{margin:0 0 38px;display:flex;justify-content:space-between;color:var(--gold);font-size:.58rem;font-weight:900;letter-spacing:.14em}.price-label span{padding:6px 8px;color:#f7eee8;background:rgba(166,58,98,.2);border:1px solid rgba(166,58,98,.35);font-size:.45rem}.price{display:flex;align-items:flex-start;margin-bottom:25px}.price small{padding-top:12px;color:#c7b6b0;font-size:1rem;font-weight:800}.price strong{font-size:7.8rem;line-height:.83;letter-spacing:-.11em}.price sup{padding-top:9px;font-size:1.4rem;font-weight:800}.price-jump{padding:15px;display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;background:rgba(255,255,255,.035);border:1px solid var(--line)}.price-jump span{display:grid;color:#80736f;font-size:.46rem;font-weight:900;letter-spacing:.09em}.price-jump b{margin-top:4px;color:#d8c9c3;font-size:.65rem}.price-jump i{color:var(--gold);font-style:normal}.event-line{margin:25px 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:9px;color:#b6a6a0;font-size:.59rem;font-weight:800}.third-lot{margin:15px 0 8px;text-align:center;color:#766a67;font-size:.53rem}.purchase-note{display:block;text-align:center;color:#6f6360;font-size:.49rem;line-height:1.45}
.hosts{display:grid;grid-template-columns:.82fr 1fr;gap:100px;align-items:center;color:#24151d;background:#eee5df}.hosts-image{position:relative;height:780px;overflow:hidden}.hosts-image img{object-position:54% center}.hosts-badge{position:absolute;right:0;bottom:0;width:190px;height:120px;padding:24px;display:flex;align-items:center;gap:15px;color:white;background:var(--rose2)}.hosts-badge strong{color:var(--gold);font-size:3.2rem;letter-spacing:-.08em}.hosts-badge span{font-size:.53rem;font-weight:900;letter-spacing:.1em;line-height:1.45}.hosts h2{font-size:clamp(2.8rem,4.5vw,4.8rem)}.hosts-copy>h3{margin:31px 0 6px;color:var(--rose2);font-size:1.4rem;letter-spacing:-.035em}.hosts-role{padding-bottom:22px;border-bottom:1px solid #cdbfc5;color:#7f5547!important;font-size:.72rem!important;font-weight:900;letter-spacing:.06em}.hosts-copy>p{color:#67575f;font-size:.86rem;line-height:1.75}.hosts-copy>p strong{color:var(--rose2)}
.receive{background:#21101a}.receive-heading{grid-template-columns:1fr}.receive-heading>div{max-width:820px}.receive-grid{margin-top:62px;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line)}.receive-grid article{min-height:280px;padding:27px;display:flex;flex-direction:column;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(150deg,rgba(166,58,98,.07),transparent 55%)}.receive-grid article:nth-child(3n){border-right:0}.receive-grid article:nth-last-child(-n+3){border-bottom:0}.receive-grid article>span{color:var(--gold);font-size:.58rem;font-weight:900}.receive-grid h3{margin:auto 0 13px;font-size:1.4rem;letter-spacing:-.04em}.receive-grid p,.receive-grid li{color:#a99a94;font-size:.76rem;line-height:1.65}.receive-grid p{margin:0}.receive-grid .materials{background:linear-gradient(140deg,rgba(123,37,73,.42),rgba(166,58,98,.08))}.materials ul{margin:0;padding-left:18px}.materials li+li{margin-top:5px}
.faq{display:grid;grid-template-columns:.68fr 1fr;gap:100px;color:#271820;background:#eee5df}.faq-title{position:sticky;top:70px;align-self:start}.faq-title h2{font-size:clamp(3rem,4.7vw,5.2rem)}.faq-title>p:last-child{max-width:460px;margin-top:28px;color:#6d5e65;line-height:1.75}.faq-list{border-top:1px solid #cbbdc3}.faq details{border-bottom:1px solid #cbbdc3}.faq summary{min-height:88px;padding:20px 0;display:flex;align-items:center;justify-content:space-between;gap:25px;cursor:pointer;list-style:none;font-size:.9rem;font-weight:850}.faq summary::-webkit-details-marker{display:none}.faq summary i{width:35px;height:35px;flex:0 0 35px;display:grid;place-items:center;color:var(--rose2);border:1px solid #bdacb4;border-radius:50%;font-size:1.2rem;font-style:normal;transition:.2s}.faq details[open] summary i{transform:rotate(45deg)}.faq details p{max-width:650px;padding:0 55px 27px 0;margin:0;color:#6b5b63;font-size:.83rem;line-height:1.7}
.final{position:relative;min-height:780px;display:grid;place-items:center;text-align:center;background:radial-gradient(circle at 50% 44%,rgba(166,58,98,.22),transparent 39%),#12080e}.final-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(217,174,90,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(217,174,90,.055) 1px,transparent 1px);background-size:70px 70px;mask-image:radial-gradient(circle,#000,transparent 72%)}.final-content{position:relative;max-width:980px;margin:auto}.final-content .section-label{justify-content:center}.final h2{font-size:clamp(3rem,5vw,5.6rem)}.final-content>p:not(.section-label){max-width:700px;margin:28px auto;color:#b9a9a3;line-height:1.75}.final-content>p strong{color:#e2d3cd}.final h3{margin:32px 0 20px;color:var(--gold);font-size:.76rem;letter-spacing:.13em}.final-meta{display:flex;align-items:center;justify-content:center;gap:11px;color:#a99a94;font-size:.63rem;font-weight:850}.final-offer{margin:23px auto 27px;display:grid}.final-offer span{color:#837671;font-size:.5rem;font-weight:900;letter-spacing:.13em}.final-offer strong{color:white;font-size:3rem;letter-spacing:-.07em}footer{min-height:150px;padding:35px max(24px,calc((100vw - var(--max))/2));display:grid;grid-template-columns:1fr 1fr 1fr;gap:45px;align-items:center;background:#090407;border-top:1px solid #24151c}footer strong{font-size:.55rem;letter-spacing:.12em}footer p,footer small{margin:7px 0 0;color:#726662;font-size:.52rem;line-height:1.55}footer>p{text-align:center}footer>small{text-align:right}.mobile-buy{display:none}
@media(max-width:1050px){.hero{grid-template-columns:1fr .7fr}.hero-photo{height:630px}.recognition,.hosts{gap:60px}.discovery-grid{grid-template-columns:1fr 1fr}.discovery-grid article:nth-child(2){border-right:0}.discovery-grid article:nth-child(-n+2){border-bottom:1px solid var(--line)}.offer{gap:55px}.receive-grid{grid-template-columns:1fr 1fr}.receive-grid article:nth-child(3n){border-right:1px solid var(--line)}.receive-grid article:nth-child(2n){border-right:0}.receive-grid article:nth-last-child(-n+3){border-bottom:1px solid var(--line)}.receive-grid article:nth-last-child(-n+2){border-bottom:0}}
@media(max-width:760px){.section{padding:78px 18px}.topbar{min-height:68px;padding:10px 15px}.brand strong{font-size:.64rem}.brand small{font-size:.38rem}.brand-mark{width:38px;height:38px}.top-cta{display:none}.hero{min-height:auto;padding:100px 18px 55px;display:flex;flex-direction:column;gap:40px}.hero-grid{mask-image:linear-gradient(#000,transparent 75%)}.hero-copy{width:100%}.hero h1{font-size:clamp(3.15rem,13.8vw,4.35rem);line-height:.92}.hero-lead{font-size:.92rem;line-height:1.66}.hero-facts{display:grid;grid-template-columns:1fr}.hero-facts i{display:none}.hero-facts span{padding:9px 0;border-bottom:1px solid var(--line)}.hero-action{align-items:stretch;flex-direction:column;gap:17px}.hero-action .button{width:100%}.hero-action>p{padding:13px 0 0;border-left:0;border-top:1px solid var(--line)}.hero-photo{width:calc(100% + 36px);height:570px;margin-inline:-18px;align-self:auto}.hero-photo:before{background:linear-gradient(0deg,#160b12 0%,transparent 28%)}.hero-photo img{object-position:center 25%}.recognition,.hosts,.offer,.faq,.section-heading{grid-template-columns:1fr;gap:42px}.recognition-photo{height:520px;margin-inline:-18px}.recognition-copy h2{font-size:3.3rem}.check-list{margin-top:32px}.check-list li{font-size:.82rem;align-items:flex-start}.recognition-close strong{font-size:1.15rem}.section-heading{gap:24px}.behind h2{font-size:3.25rem}.discovery-grid{margin-top:42px;grid-template-columns:1fr}.discovery-grid article{min-height:260px;border-right:0!important;border-bottom:1px solid var(--line)!important}.discovery-grid article:last-child{border-bottom:0!important}.discovery-grid h3{margin-top:55px}.center-cta{margin-top:38px}.center-cta .button{width:100%}.for-you-card{text-align:left}.for-you-card .section-label{justify-content:flex-start}.for-you h2{font-size:3rem}.for-you-lead{font-size:.9rem}.no-exposure{padding:22px 20px}.offer h2{font-size:3.25rem}.offer-list{grid-template-columns:1fr}.price-card{padding:28px 20px}.price strong{font-size:6.8rem}.price-jump{gap:8px}.hosts-copy{grid-row:1}.hosts-image{grid-row:2;height:570px;margin-inline:-18px}.hosts h2{font-size:3.1rem}.hosts-copy>p{font-size:.82rem}.receive-grid{margin-top:42px;grid-template-columns:1fr}.receive-grid article{min-height:235px;border-right:0!important;border-bottom:1px solid var(--line)!important}.receive-grid article:last-child{border-bottom:0!important}.receive-grid h3{margin-top:45px}.faq{gap:30px}.faq-title{position:static}.faq summary{font-size:.83rem}.final{min-height:720px}.final h2{font-size:3.25rem}.final .button{width:100%}footer{padding:34px 18px 105px;grid-template-columns:1fr;gap:18px}footer>p,footer>small{text-align:left}.mobile-buy{position:fixed;z-index:80;left:0;right:0;bottom:0;min-height:72px;padding:9px 11px;display:flex;align-items:center;justify-content:space-between;color:white;background:rgba(14,7,11,.97);border-top:1px solid var(--line);backdrop-filter:blur(14px)}.mobile-buy>span{display:grid}.mobile-buy small{color:#887b77;font-size:.45rem}.mobile-buy strong{color:var(--gold)}.mobile-buy>a{padding:15px 17px;display:flex;align-items:center;gap:11px;color:white;background:linear-gradient(135deg,var(--rose2),var(--rose));border-radius:999px;font-size:.55rem;font-weight:900}.mobile-buy b{color:var(--gold)}}
@media(max-width:390px){.hero h1{font-size:2.95rem}.hero-photo{height:520px}.price strong{font-size:5.9rem}.button{font-size:.64rem;padding-left:19px}.mobile-buy>a{padding-inline:13px;font-size:.5rem}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition:none!important}}
`;

const js = `
document.querySelectorAll('.faq details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
`;

for (const [route, angle] of Object.entries(angles)) {
  const output = path.join(root, route);
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'index.html'), renderPage(route, angle));
  fs.writeFileSync(path.join(output, 'styles.css'), css);
  fs.writeFileSync(path.join(output, 'script.js'), js);
}

console.log('Três ângulos atualizados com a nova estrutura da cliente.');
