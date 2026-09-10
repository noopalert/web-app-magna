(() => {
  const storageKey = 'magna-theme';
  const sidebarStorageKey = 'magna-sidebar-collapsed';
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
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      const brand = sidebar.querySelector('.brand');
      const brandMark = sidebar.querySelector('.brand-mark');
      const footer = sidebar.querySelector('.sidebar-footer');
      const themeButton = sidebar.querySelector('[data-theme-toggle]');
      const userInfo = footer?.querySelector('.avatar + div');

      if (userInfo) userInfo.classList.add('sidebar-user');
      if (footer && themeButton) footer.appendChild(themeButton);

      if (brand && brandMark) {
        brandMark.classList.add('sidebar-logo-toggle');
        brandMark.setAttribute('role', 'button');
        brandMark.setAttribute('tabindex', '0');
        const setSidebarState = (collapsed) => {
          sidebar.classList.toggle('is-collapsed', collapsed);
          brandMark.setAttribute('aria-expanded', String(!collapsed));
          brandMark.setAttribute('aria-label', collapsed ? 'Open sidebar' : 'Close sidebar');
          brandMark.setAttribute('title', collapsed ? 'Open sidebar' : 'Close sidebar');
        };

        const storedSidebarState = localStorage.getItem(sidebarStorageKey);
        const defaultCollapsed = window.matchMedia('(max-width: 900px)').matches;
        setSidebarState(
          storedSidebarState === null
            ? defaultCollapsed
            : storedSidebarState === 'true'
        );
        const toggleSidebar = () => {
          const collapsed = !sidebar.classList.contains('is-collapsed');
          localStorage.setItem(sidebarStorageKey, String(collapsed));
          setSidebarState(collapsed);
        };

        brandMark.addEventListener('click', toggleSidebar);
        brandMark.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleSidebar();
          }
        });
      }

      const salesCommissionSummary = sidebar.querySelector('.nav-summary');
      if (salesCommissionSummary) {
        salesCommissionSummary.addEventListener('click', (event) => {
          if (!sidebar.classList.contains('is-collapsed')) return;
          event.preventDefault();
          window.location.href = 'sales-commission.html';
        });
      }

      sidebar.querySelectorAll('.nav-item').forEach((item) => {
        const label = item.textContent.replace(/\s+/g, ' ').trim();
        if (label) item.setAttribute('title', label);
      });
    }

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
