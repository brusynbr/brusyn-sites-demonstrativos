(() => {
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.navlinks, .links');
  const closeMenu = () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  };
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!event.target.closest('header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });
  matchMedia('(max-width: 800px)').addEventListener('change', closeMenu);

  const form = document.querySelector('form');
  const choice = document.querySelector('#interest, #service');
  const modal = document.querySelector('dialog');
  const preview = document.querySelector('#preview');
  const status = document.querySelector('#copy-status, #status');
  let returnFocus;
  document.querySelectorAll('[data-choice], [data-service]').forEach(button => {
    button.addEventListener('click', () => {
      choice.value = button.dataset.choice || button.dataset.service;
      const device = document.querySelector('#device');
      if (device) {
        const devices = { 'Troca de tela': 'Celular', 'Bateria e conector': 'Celular', 'Limpeza e manutenção': 'Notebook', 'Upgrade de memória/SSD': 'Notebook', 'Diagnóstico de console': 'Videogame', 'Formatação e configuração': 'Computador' };
        device.value = devices[choice.value];
      }
      form.closest('section').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      choice.focus({ preventScroll: true });
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = ['Nome: ' + String(data.get('name')).trim()];
    if (data.has('device')) lines.push('Aparelho: ' + data.get('device'), 'Serviço: ' + data.get('service'), 'Descrição: ' + (String(data.get('details')).trim() || 'Não informada'));
    else lines.push('Interesse: ' + data.get('interest'), 'Mensagem: ' + (String(data.get('message')).trim() || 'Não informada'));
    preview.textContent = lines.join('\n');
    status.textContent = '';
    returnFocus = document.activeElement;
    document.body.classList.add('modal-open');
    modal.showModal();
    modal.querySelector('.close').focus();
  });
  modal.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]'))
      .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  modal.querySelector('.close').addEventListener('click', () => modal.close());
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    returnFocus?.focus({ preventScroll: true });
  });
  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });
  document.querySelector('#copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.textContent);
      status.textContent = 'Prévia copiada.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(preview);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Texto selecionado. Use o comando de copiar do seu dispositivo.';
    }
  });
  const filters = document.querySelectorAll('[data-filter]');
  const products = document.querySelectorAll('.product');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let count = 0;
    products.forEach(product => {
      product.hidden = button.dataset.filter !== 'Todos' && product.dataset.category !== button.dataset.filter;
      if (!product.hidden) count += 1;
    });
    document.querySelector('#count').textContent = count + (count === 1 ? ' categoria na seleção.' : ' categorias na seleção.');
  }));
})();
