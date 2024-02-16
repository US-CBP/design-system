import { Component, Prop, Element, Event, EventEmitter, Method, Watch, Host, h } from '@stencil/core';
import { setCSSProps, getFocusableElements } from '../../utils/utils';

@Component({
  tag: 'cbp-drawer',
  styleUrl: 'cbp-drawer.scss',
})
export class CbpDrawer {
  
  private drawer: HTMLElement;
  private focusableElements: any[];

  @Element() host: HTMLElement;

  /** Specifies the position of the drawer (left or right) */
  @Prop({ reflect: true }) position: 'left' | 'right' = 'left';

  /** When set, specifies that the drawer is open */
  @Prop({ reflect: true }) open: boolean;
  
  /** Specifies a unique `ID` for the drawer, used to wire up the controls and accessibility features. */
  @Prop() uid: string;
  
  /** Creates an accessible label for the drawer (dialog). */
  @Prop() accessibilityText: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** Custom event fired when the drawer is opened. */
  @Event() drawerOpen!: EventEmitter;
  /** Custom event fired when the drawer is closed. */
  @Event() drawerClose!: EventEmitter;


  @Watch('open') 
  watchOpenHandler(newValue: boolean) {
    newValue==true ? this.setFocus() : this.closeDrawer();
  }

  /** A public method for opening the drawer. */
  @Method()
  async openDrawer() {
    this.open=true;
    this.drawerOpen.emit({
      host: this.host,
      open: this.open,
    });
  }

  /** A public method for closing the drawer. */
  @Method()
  async closeDrawer() {
    this.open=false;
    this.drawerClose.emit({
      host: this.host,
      open: this.open,
    });
  }

  setFocus() {
    setTimeout( () => {
      if (!this.focusableElements) {
        this.focusableElements=getFocusableElements(this.host);  
      }
      this.focusableElements[0]?.focus()
      //console.log(this.focusableElements,document.activeElement);
    },100);
  }

  handleBackdropClick({target}) {
    !target.closest('.cbp-drawer__content') && this.closeDrawer();
  }

  handleKeyUp(e) {
    e.key == 'Escape' && this.closeDrawer();
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
      <Host
        onClick={(e) => this.handleBackdropClick(e)}
        onKeyUp={(e) => this.handleKeyUp(e)}
        id={this.uid}
      >
        <div
          ref={(el) => this.drawer = el}
          role="dialog"
          aria-modal="true"
          class="cbp-drawer__content"
          aria-label={this.accessibilityText}
          tabindex="-1"
        >
          <cbp-button
            class="cbp-drawer__close-button"
            variant="square"
            type="button"
            color="secondary"
            fill="ghost"
            accessibility-text="Close"
            target-prop="open"
            controls={this.uid}
          >
            <cbp-icon name="circle-xmark"></cbp-icon>
          </cbp-button>

          <slot />

        </div>
      </Host>
    );
  }
}