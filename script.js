const path = window.location.pathname.split("/").pop() || "index.html";
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const savedTheme = window.localStorage.getItem("codewave-theme");
const mobileNavQuery = window.matchMedia("(max-width: 960px)");

const closeNav = () => {
  document.body.classList.remove("nav-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }
};

const openNav = () => {
  document.body.classList.add("nav-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
  }
};

const setTheme = (theme) => {
  const isLight = theme === "light";
  document.body.classList.toggle("theme-light", isLight);

  if (themeLabel) {
    themeLabel.textContent = isLight ? "Tema escuro" : "Tema claro";
  }
};

setTheme(savedTheme === "light" ? "light" : "dark");

document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.getAttribute("href") === path) {
    link.classList.add("is-active");
  }

  link.addEventListener("click", () => {
    closeNav();
  });
});

const portfolioList = document.querySelector("[data-portfolio-list]");
if (portfolioList && Array.isArray(window.portfolioLinks)) {
  portfolioList.innerHTML = "";

  window.portfolioLinks.forEach((item) => {
    const article = document.createElement("article");
    article.className = "portfolio-card";
    article.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.url}" target="_blank" rel="noreferrer">Abrir projeto</a>
    `;
    portfolioList.appendChild(article);
  });
}

const searchInput = document.querySelector("[data-faq-search]");
const faqItems = [...document.querySelectorAll("[data-faq-item]")];

if (searchInput && faqItems.length) {
  const filterFaq = () => {
    const term = searchInput.value.trim().toLowerCase();

    faqItems.forEach((item) => {
      const content = item.textContent.toLowerCase();
      const matches = !term || content.includes(term);
      item.hidden = !matches;
    });
  };

  searchInput.addEventListener("input", filterFaq);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    const nextTheme = isLight ? "dark" : "light";
    window.localStorage.setItem("codewave-theme", nextTheme);
    setTheme(nextTheme);
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("nav-open");

    if (isOpen) {
      closeNav();
      return;
    }

    openNav();
  });

  document.addEventListener("click", (event) => {
    if (!mobileNavQuery.matches || !document.body.classList.contains("nav-open")) {
      return;
    }

    if (navMenu.contains(event.target) || navToggle.contains(event.target)) {
      return;
    }

    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  mobileNavQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      closeNav();
    }
  });
}
