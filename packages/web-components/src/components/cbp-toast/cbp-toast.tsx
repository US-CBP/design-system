import { Component, Prop, Element, Host, h, Method } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * A Toast is a way to display messages or notifications, often temporarily, that pop out from the edge of the browser viewport.
 * 
 * @slot - The toast content is slotted in the default slot.
 * @slot cbp-toast-icon - The large toast icon, usually corresponding to the color variant, is slotted in this named slot.
 * @slot cbp-toast-title - The toast title is slotted within this named slot.
 * @slot cbp-toast-buttons - The toast action buttons are placed within this named slot.
 */
@Component({
  tag: 'cbp-toast',
  styleUrl: 'cbp-toast.scss'
})
export class CbpToast {

  @Element() private host: HTMLElement;

  private animation: 'top' | 'right' | 'bottom' | 'left' = 'right';

  /** Specifies the color of the toast. Defaults to "info". */
  @Prop({ reflect: true }) color: 'info' | 'danger' | 'success' | 'warning' = 'info';

  /** Specifies time in seconds for the toast to be displayed. Defaults to persistent until dismissed. */
  @Prop() duration: number;

  /**
   * When set, specifies that the toast is visible. To show and dismiss a toast programmatically after a page has loaded, 
   * use the showToast() and dismissToast() methods, respectively.
  */
  @Prop({ reflect: true }) open: boolean;
  
  /** 
   * Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A public method to show a toast notification with its animation. */
  @Method()
  async showToast(){
    this.host.classList.add('cbp-toast--open');
    this.host.classList.remove('cbp-toast--close');
  }
  
  /** A public method to dismiss a toast notification. */
  @Method()
  async dismissToast(){
    this.host.classList.remove('cbp-toast--open');
    this.host.classList.add('cbp-toast--close');
    setTimeout(() => {this.open = false}, 1000);
  }
  

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentWillRender() {
    if (this.host.parentElement.tagName == 'CBP-TOAST-CONTAINER'){
      const toastContainer = this.host.closest('cbp-toast-container');
      switch (toastContainer.position){
        case 'top-left' :
        case 'bottom-left': 
          this.animation = 'left';
          break;
        case 'top-right':
        case 'bottom-right':
          this.animation = 'right';
          break;
        case 'bottom-center': 
          this.animation = 'bottom';
          break;
        case 'top-center':
          this.animation = 'top'
          break;
      }
      this.host.setAttribute('data-animation', this.animation);
    }
  }

  componentDidRender() {
    setTimeout(() => {
      this.open ? this.showToast() : this.dismissToast();
    }, 10);
  }

  render() {
    if(this.open && this.duration){
      setTimeout(() => { this.dismissToast() }, this.duration * 1000)
    }
    
    return (
      <Host>
        <div class="cbp-toast-sidebar">
          <slot name="cbp-toast-icon" />
        </div>
        <div class="cbp-toast-container">
          <div class="cbp-toast-title">
            <slot name="cbp-toast-title" />
          </div>
          <div class="cbp-toast-content">
            <slot />
          </div>
          <div class="cbp-toast-button-bar">
            <slot name="cbp-toast-buttons" />
          </div>
        </div>
      </Host>
    );
  }
}
