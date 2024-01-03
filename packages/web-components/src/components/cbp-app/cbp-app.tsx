import { Component, Host, h } from '@stencil/core';

/*
  An overarching "app" tag can act as a low-barrier way to get core design system elements (CSS, fonts)
  as well as a way to manage site/page-level settings such as dark mode.
*/

@Component({
  tag: 'cbp-app',
  //styleUrl: 'cbp-app.scss'
  //this is not working: appears to be a Stencil bug - verify
  styleUrls: ['reset.scss', 'roboto.scss', 'css-variables.scss', 'core.scss']
})
export class CbpApp {

  render() {
    return (
      <Host>
        <slot />

        <svg xmlns="http://www.w3.org/2000/svg" style={{"display":"none"}}>
          <defs>
            <symbol id="news" viewBox="0 0 576 512">
                <path d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"/>
            </symbol>
          </defs>
        </svg>
      </Host>
    );
  }

}
