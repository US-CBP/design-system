class DarkMode {
  constructor(themeToggle) {
    // Toggle component needs to have 'data-theme-toggle' attribute in order for this to work.
    this.themeToggle = themeToggle;
    this.prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.storedTheme = localStorage.getItem('theme');

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
    theme === 'dark' ? this.themeToggle.checked = true : this.themeToggle.checked = false;

    if (this.storedTheme === 'light' || this.storedTheme === 'dark') {
      document.documentElement.setAttribute('data-cbp-theme', theme);
    }
  }

  handleThemeToggle(themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (themeToggle.checked) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.setAttribute('data-cbp-theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.setAttribute('data-cbp-theme', 'light');
      }
    })
  }
}

export default DarkMode;
