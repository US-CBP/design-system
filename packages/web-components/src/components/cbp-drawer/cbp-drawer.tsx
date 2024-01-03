import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-drawer',
  styleUrl: 'cbp-drawer.scss',
})
export class CbpDrawer {
  private drawer: HTMLElement;
  
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) position: 'left' | 'right' = 'left';
  @Prop({ reflect: true }) open: boolean;
  @Prop() uid: string;
  @Prop() accessibilityText: string;
  //@Prop() breakpoint: string;


  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() drawerToggle!: EventEmitter;

  /*
  drawerDidUpdate() {
    this.drawerUpdate.emit({
      open: this.open
    });
    this.setFocusElement();
  }
  
*/
  // Add a class via DOM after the rendering to allow for animation
  toggleDrawer = () => {
    this.open=!this.open;
    this.drawerToggle.emit({
      host: this.host,
      open: this.open,
    });
    //this.setFocusElement();
  }

  componentDidLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.drawer, {
      ...this.sx,
    });
  }

  componentDidRender() {
    setTimeout(() => {
      (this.open) ?
      this.drawer.classList.add('cbp-drawer--open')
      : this.drawer.classList.remove('cbp-drawer--open');  
    }, 10);
    
  }

  render() {
    return (
      <Host>
        <div
          class="cbp-drawer__content"
          role="dialog"
          aria-label={this.accessibilityText}
          tabindex="-1"
          ref={(el) => this.drawer = el}
        >
          <cbp-button
            class="cbp-drawer__close-button"
            variant="square"
            type="button"
            color="secondary"
            fill="ghost"
            accessibility-text="Close"
            target-prop="open"
            controls="drawer"
          >
            <cbp-icon name="circle-xmark"></cbp-icon>
          </cbp-button>
          <slot />
        </div>
      </Host>
    );
  }
}
