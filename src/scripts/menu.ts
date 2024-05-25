document.querySelector('.hamburger')!.addEventListener('click', () => {
  document.querySelectorAll('.nav-links a').forEach((value, _key, _parent) => {
    value.classList.toggle('expanded');
  });
});