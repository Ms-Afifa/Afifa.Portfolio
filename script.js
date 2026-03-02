// ================= UTILITY HELPERS =================
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

// ================= THEME TOGGLE (Improved UX) =================
const toggleBtn = qs("#theme-toggle");
const body = document.body;

if (toggleBtn) {
  // Load saved theme safely
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    toggleBtn.textContent = isDark ? "☀" : "☾";
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Small interaction feedback
    toggleBtn.classList.add("clicked");
    setTimeout(() => toggleBtn.classList.remove("clicked"), 150);
  });
}

// ================= SCROLL REVEAL (Optimized) =================
const reveals = qsa(".reveal");

const revealOnScroll = () => {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
};

// Performance-friendly scroll handler
let isScrolling = false;

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

revealOnScroll();

// ================= WORK FILTER (Better UX) =================
const filterBtns = qsa(".filter-btn");
const projects = qsa(".gallery-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach((project) => {
      const match =
        filter === "all" || project.classList.contains(filter);

      project.style.display = match ? "block" : "none";

      // Smooth fade effect
      project.style.opacity = match ? "1" : "0";
      project.style.transform = match
        ? "scale(1)"
        : "scale(0.95)";
    });
  });
});

// ================= MOBILE NAV (Accessible) =================
const navToggle = qs(".nav-toggle");
const navLinks = qs(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");
  });

  // Close menu when link clicked
  qsa(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    }
  });
}

// ================= SECTION SCROLL EFFECT (Smoother) =================
const sections = qsa("section");

window.addEventListener("scroll", () => {
  const viewportHeight = window.innerHeight;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    const visible =
      1 - Math.abs(rect.top) / viewportHeight;

    const opacity = Math.min(
      Math.max(visible, 0.1),
      0.3
    );

    section.style.setProperty(
      "--section-opacity",
      opacity.toFixed(2)
    );
  });
});

// ================= SMALL UX EXTRAS =================

// Add active nav highlight on scroll
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 100;

  qsa("nav a").forEach((link) => {
    const section = qs(link.hash);

    if (!section) return;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});


const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let current = '';

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});


// Highlight active process step on scroll
const processSteps = document.querySelectorAll(".process-step");

window.addEventListener("scroll", () => {
  processSteps.forEach(step => {
    const rect = step.getBoundingClientRect();

    if (rect.top < window.innerHeight - 120) {
      step.classList.add("active");
    }
  });
});


// Animate skill bars on scroll
const skillSection = document.querySelector("#skills-tools-section");
const progressBars = document.querySelectorAll(".skill-progress");

const animateSkills = () => {
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos) {
    progressBars.forEach(bar => {
      const value = bar.getAttribute("data-value");
      bar.style.width = value + "%";
    });
  }
};

window.addEventListener("scroll", animateSkills);
