import { Component, Prop, Host, h, Env } from '@stencil/core';

/**
 * An overarching App tag acts as a low-barrier way to get core design system elements (design tokens and styles)
 * as well as a way to manage site/page-level settings such as dark mode.
 * 
 *  @slot - All application markup should be placed within the default slot to inherit the base CSS, design tokens, and dark mode styling.
 */
@Component({
  tag: 'cbp-app',
  styleUrls: ['reset.scss', 'cbp-design-tokens.scss', 'core.scss', 'cbp-app.scss']
})
export class CbpApp {

  private darkMode: MediaQueryList;

  /** Optionally specifies light/dark mode. This is only needed if the application can change the theme separate from OS settings.  */
  @Prop({reflect: true}) theme: "light" | "dark" | "system" = "system"

  /** Turning on debug mode will log the version of the design system package and Stencil version it was built with to the console, in addition to application name and version, if specified. */
  @Prop({reflect: true}) debug: boolean;

  /** Specifies the application name for logging with debug information. */
  @Prop({reflect: true}) appName: string;

  /** Specifies the application version for logging with debug information. This may be automated by importing it from the application's package.json, if used. */
  @Prop({reflect: true}) appVersion: string;

  
  handleThemeChange(mql) {
    this.theme = mql.matches ? "dark" : "light";
  }

  componentDidLoad() {
    this.darkMode = window?.matchMedia(`(prefers-color-scheme: dark)`);
    // Only set up the listener if we're using the system default, otherwise it's being set manually via reactive property
    if (this.theme === "system") {
      this.darkMode.addEventListener('change', mql => this.handleThemeChange(mql)); // Add an event listener to the media query
      this.handleThemeChange(this.darkMode); // Run the theme change handler once on load
    }
  }

  componentWillUpdate() {
    // If it's set back to system, force it to dark or light for the CSS to work
    if(this.theme === 'system'){
      this.theme = this.darkMode.matches ? "dark" : "light";
    }
  }

  render() {
    // If debug is enabled, write debug info to the console
    if (this.debug) {
      let debugInfo = `DEBUGGING INFO:\n===============\n`;
      if (this.appName) debugInfo += `Application name: ${this.appName}\n`;
      if (this.appVersion) debugInfo += `Application version: ${this.appVersion}\n`;
      debugInfo += `CBP Design System version: ${Env.version}\n`;
      debugInfo += `Built with StencilJS: ${Env.stencil}`;
      console.log(debugInfo);
    }

    return (
      <Host data-cbp-theme={this.theme}>
        <slot />
      </Host>
    );
  }

}
