(() => {
  const storageKey = 'magna-theme';
  const root = document.documentElement;

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(storageKey);

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';

      button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
      button.setAttribute('title', `Switch to ${nextTheme} mode`);
    });
  };

  applyTheme(root.dataset.theme || getPreferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextTheme =
          root.dataset.theme === 'dark' ? 'light' : 'dark';

        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
      });
    });
  });
})();