(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.navlinks');
  const closeMenu = () => {
    links?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = 'Menu ☰';
  };
  menu?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Fechar ×' : 'Menu ☰';
  });
  links?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links?.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (links?.classList.contains('open') && !event.target.closest('nav')) closeMenu();
  });
  matchMedia('(min-width: 851px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  const form = document.querySelector('form');
  const choice = document.querySelector('#interest');
  const modal = document.querySelector('dialog');
  const preview = document.querySelector('#preview');
  const status = document.querySelector('#copy-status');
  let previousFocus;
  document.querySelectorAll('[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      choice.value = button.dataset.choice;
      document.querySelector('#contato').scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
      choice.focus({ preventScroll: true });
    });
  });

  // Dates help plan a request; this page never books a stay.
  const arrival = form?.querySelector('[name="arrival"]');
  const departure = form?.querySelector('[name="departure"]');
  const validateDates = () => {
    if (!departure) return;
    const invalid = arrival.value && departure.value && departure.value <= arrival.value;
    departure.setCustomValidity(invalid ? 'Escolha uma saída posterior à chegada.' : '');
  };
  arrival?.addEventListener('input', validateDates);
  departure?.addEventListener('input', validateDates);
  const formatValue = field => {
    const value = field.value.trim();
    if (field.type === 'date' && value) {
      const [year, month, day] = value.split('-');
      return `${day}/${month}/${year}`;
    }
    return value;
  };
  form?.addEventListener('submit', event => {
    event.preventDefault();
    validateDates();
    if (!form.reportValidity()) return;
    const lines = Array.from(form.querySelectorAll('[data-preview-label]'))
      .map(field => [field.dataset.previewLabel, formatValue(field)])
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);
    preview.textContent = lines.join('\n');
    status.textContent = '';
    previousFocus = document.activeElement;
    modal.showModal();
  });
  modal?.querySelector('.close')?.addEventListener('click', () => modal.close());
  modal?.addEventListener('close', () => previousFocus?.focus({ preventScroll: true }));
  modal?.addEventListener('click', event => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });
  document.querySelector('#copy')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.textContent);
      status.textContent = 'Prévia copiada.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(preview);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Texto selecionado. Use Ctrl+C ou a opção Copiar do seu dispositivo.';
    }
  });
})();
