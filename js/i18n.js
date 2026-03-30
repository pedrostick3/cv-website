let translations = {};
let currentLang = 'pt';

function detectLanguage() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;
  const browser = navigator.language || navigator.userLanguage;
  return browser.startsWith('pt') ? 'pt' : 'en';
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(translations, key);
    if (value) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const value = getNestedValue(translations, key);
    if (value) el.setAttribute('aria-label', value);
  });

  document.documentElement.lang = currentLang;

  const meta = translations.meta;
  if (meta) {
    document.title = meta.title || document.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && meta.description) desc.content = meta.description;
  }
}

export async function setLanguage(lang) {
  try {
    const response = await fetch(`./i18n/${lang}.json`);
    translations = await response.json();
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    updateToggleButtons();
  } catch (err) {
    console.error(`Failed to load language: ${lang}`, err);
  }
}

function updateToggleButtons() {
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

export function initI18n() {
  const lang = detectLanguage();

  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  return setLanguage(lang);
}

export function getCurrentLang() {
  return currentLang;
}
