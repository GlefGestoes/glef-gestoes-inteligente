// Controle do Menu Hambúrguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Troca o ícone de barras para X
  const icon = hamburger.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Fechar menu ao clicar em um link (para mobile)
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Manipulação do envio do formulário
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulação de envio
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Enviando...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      alert('Obrigado por sua mensagem! Entraremos em contato em breve.');
      this.reset();
      btn.innerText = originalText;
      btn.style.opacity = '1';
    }, 1500);
  });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      // Compensação para o menu fixo
      const headerOffset = 70; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Adicionar classe ativa ao link de navegação atual durante o scroll
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  
  // Efeito na navbar ao rolar
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.padding = '10px 0';
    nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
  } else {
    nav.style.padding = '15px 0';
    nav.style.backgroundColor = 'rgba(17, 18, 20, 0.95)';
  }
});