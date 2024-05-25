document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelectorAll('.nav-links a').forEach((value, key, parent) => {
    value.classList.toggle('expanded');
  });
});