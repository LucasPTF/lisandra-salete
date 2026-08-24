
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
