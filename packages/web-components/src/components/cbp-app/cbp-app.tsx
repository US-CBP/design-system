import { Component, Host, h } from '@stencil/core';

/*
  An overarching "app" tag can act as a low-barrier way to get core design system elements (CSS, fonts)
  as well as a way to manage site/page-level settings such as dark mode.
*/

@Component({
  tag: 'cbp-app',
  styleUrl: 'cbp-app.scss'
   //this is not working: appears to be a Stencil bug - verify
  //styleUrls: ['reset.scss', 'roboto.scss', 'css-variables.scss', 'core.scss']
})
export class CbpApp {

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

}
