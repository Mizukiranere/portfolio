document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Scroll Progress Bar & Navbar Scroll State
  const scrollProgressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // 3. Active Nav Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });

  // 4. Rotating Hero Text
  const roleTextElement = document.getElementById('roleText');
  const roles = [
    'Exceptional Web Experiences',
    'High-Performance Backends',
    'Scalable Cloud Architecture',
    'Clean & Maintainable Systems'
  ];
  let currentRoleIndex = 0;

  if (roleTextElement) {
    setInterval(() => {
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      roleTextElement.style.opacity = '0';
      setTimeout(() => {
        roleTextElement.textContent = roles[currentRoleIndex];
        roleTextElement.style.opacity = '1';
      }, 250);
    }, 3500);
  }

  // 5. Interactive Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Toast Notification & Copy Email Functionality
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailCard = document.getElementById('emailCard');
  const emailToCopy = 'mizukiranere@users.noreply.github.com';

  function handleCopyEmail() {
    navigator.clipboard.writeText(emailToCopy).then(() => {
      showToast('Email kontak berhasil disalin ke clipboard! 📋');
    }).catch(() => {
      showToast('Email: ' + emailToCopy);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', handleCopyEmail);
  }

  if (emailCard) {
    emailCard.addEventListener('click', handleCopyEmail);
  }
});
