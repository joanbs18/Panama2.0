window.addEventListener('scroll', () => {
    const header = document.getElementById('menu');
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  document.getElementById('currentYear').textContent = new Date().getFullYear();