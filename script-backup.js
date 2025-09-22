// ===== GESTIÓN DE TEMA CLARO/OSCURO =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Función para alternar tema (para usar en onclick del HTML)
function toggleTheme() {
  document.body.classList.toggle("dark");
  
  if (document.body.classList.contains("dark")) {
    themeIcon.className = "bi bi-sun";
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.className = "bi bi-moon";
    localStorage.setItem('theme', 'light');
  }
}

// Cargar tema guardado al inicializar
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.className = "bi bi-sun";
  }
  
  // Inicializar animaciones de entrada
  initScrollAnimations();
  
  // Inicializar navegación activa
  initActiveNavigation();
});

// Evento para alternar entre modo claro y oscuro
themeToggle.addEventListener("click", toggleTheme);

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar todas las secciones con clase fade-in
  document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
  });
}

// ===== NAVEGACIÓN ACTIVA =====
function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.navbar-menu a');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        
        // Remover clase activa de todos los enlaces
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Añadir clase activa al enlace correspondiente
        const activeLink = document.querySelector(`.navbar-menu a[href="#${currentId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observar todas las secciones
  sections.forEach(section => {
    navObserver.observe(section);
  });
}

// ===== SCROLL SUAVE MEJORADO =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Espacio para header fijo
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== EFECTOS ADICIONALES =====
// Paralaje sutil en el hero con throttling para mejor rendimiento
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('#home');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Animación de escritura para el título (opcional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Activar animación de escritura si se desea (comentado por defecto)
// window.addEventListener('load', () => {
//   const title = document.querySelector('#home h1');
//   if (title) {
//     const originalText = title.textContent;
//     typeWriter(title, originalText, 150);
//   }
// });

// ===== MENÚ MÓVIL =====
function toggleMobileMenu() {
  const navbarMenu = document.getElementById('navbar-menu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  const isActive = navbarMenu.classList.toggle('active');
  
  // Actualizar atributos de accesibilidad
  mobileToggle.setAttribute('aria-expanded', isActive);
  mobileToggle.setAttribute('aria-label', isActive ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  
  // Cambiar icono del botón hamburguesa
  const icon = mobileToggle.querySelector('i');
  if (isActive) {
    icon.className = 'bi bi-x';
  } else {
    icon.className = 'bi bi-list';
  }
}

function closeMobileMenu() {
  const navbarMenu = document.getElementById('navbar-menu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  navbarMenu.classList.remove('active');
  
  // Actualizar atributos de accesibilidad
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.setAttribute('aria-label', 'Abrir menú de navegación');
  
  // Restaurar icono hamburguesa
  const icon = mobileToggle.querySelector('i');
  icon.className = 'bi bi-list';
}

// Cerrar menú móvil al hacer clic fuera de él
document.addEventListener('click', (e) => {
  const navbar = document.querySelector('.navbar');
  const navbarMenu = document.getElementById('navbar-menu');
  
  if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
    closeMobileMenu();
  }
});

// Cerrar menú móvil al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});
