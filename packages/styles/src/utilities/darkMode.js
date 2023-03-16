class DarkMode {
  constructor(themeToggle) {
    // Toggle component needs to have 'data-theme-toggle' attribute in order for this to work.
    this.themeToggle = themeToggle;
    this.prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.storedTheme = localStorage.getItem('theme');

    this.preferredTheme() === 'dark' ? this.themeToggle.checked = true : this.themeToggle.checked = false;

    this.setTheme(this.preferredTheme());

    this.handleThemeToggle(this.themeToggle);
  }

  preferredTheme() {
    if (this.storedTheme) {
      return this.storedTheme;
    }
    return this.prefersDarkMode.matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-cbp-theme', theme);
  }

  handleThemeToggle(themeToggle) {
    themeToggle.addEventListener('click', () => {
      themeToggle.checked ? this.setTheme('dark') : this.setTheme('light');
    })
  }
}

export default DarkMode;
