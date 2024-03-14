import { Component, Prop, Host, h } from '@stencil/core';

/*
  An overarching "app" tag can act as a low-barrier way to get core design system elements (CSS, fonts)
  as well as a way to manage site/page-level settings such as dark mode.
*/

/**
 *  @slot - All application markup should be placed within the default slot.
 */
@Component({
  tag: 'cbp-app',
  styleUrls: ['reset.scss', 'roboto.scss', 'css-variables.scss', 'core.scss']
})
export class CbpApp {

  /** Optionally specifies light/dark mode. This is only needed if the application can change the theme separate from OS settings.  */
  @Prop({reflect: true}) theme: "light" | "dark" | "system" = "system"

  handleThemeChange(mql) {
    this.theme = mql.matches ? "dark" : "light";
  }

  componentDidLoad() {
    const darkMode = window?.matchMedia(`(prefers-color-scheme: dark)`);
    // Only set up the listener if we're using the system default, otherwise, it's being set manually
    if (this.theme=="system" && darkMode) {
      darkMode.addEventListener('change', mql => this.handleThemeChange(mql)); // Add an event listener to the media query
      this.handleThemeChange(darkMode); // Run the theme change handler once on load
    }
  }

  render() {
    return (
      <Host data-cbp-theme={this.theme}>
        <slot />
      </Host>
    );
  }

}
