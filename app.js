const menuToggle = document.querySelector('.menu-toggle');
const navlinks = document.querySelector('.navlinks');

if (menuToggle && navlinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navlinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.paper').forEach((paper) => {
      const show = selected === 'all' || paper.dataset.type === selected;
      paper.classList.toggle('hidden', !show);
    });
  });
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;

    const text = target.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = 'Copiado';
      setTimeout(() => {
        button.textContent = original;
      }, 1600);
    } catch (error) {
      console.warn('No se pudo copiar automáticamente:', error);
      window.getSelection().selectAllChildren(target);
    }
  });
});
