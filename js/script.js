// Controle do Menu Hambúrguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  const icon = hamburger.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Fechar menu ao clicar em link (mobile)
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

// Manipulação do Formulário
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
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

// Smooth Scroll com compensação do Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
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

// Active Link na Navegação
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
  
  // Navbar Background
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.padding = '10px 0';
    nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
  } else {
    nav.style.padding = '15px 0';
    nav.style.backgroundColor = 'rgba(17, 18, 20, 0.95)';
  }
});

// =========================================
// SCROLL REVEAL LOGIC (PERMANENTE/REPLAY)
// =========================================

const revealOptions = {
    threshold: 0.15, // Aumentei levemente para garantir que o elemento esteja bem visível antes de animar
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Se entrou na tela: Adiciona classe active (dispara animação)
            entry.target.classList.add('active');
        } else {
            // Se saiu da tela: Remove classe active (reseta estado para invisível)
            // Isso permite que a animação ocorra novamente ao voltar
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

// Observa todos os elementos com a classe .reveal
document.querySelectorAll('.reveal').forEach(el => {
    revealOnScroll.observe(el);
});
