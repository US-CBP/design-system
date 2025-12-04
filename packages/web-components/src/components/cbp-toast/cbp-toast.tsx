import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Toast component displays a brief, non-intrusive message that appears on a user interface to 
 * provide feedback about an action or status update.
 * 
 * @slot - The toast content is slotted in the default slot.
 * @slot cbp-toast-icon - The large toast icon, usually corresponding to the color variant, is slotted in this named slot.
 * @slot cbp-toast-title - The toast title is slotted within this named slot.
 * @slot cbp-toast-buttons - The toast action buttons, including a button to dismiss the toast at a minimum, are placed within this named slot.
 */
@Component({
  tag: 'cbp-toast',
  styleUrl: 'cbp-toast.scss'
})
export class CbpToast {

  @Element() host: HTMLElement;

  /** specifies the color for the toast */
  @Prop({ reflect: true }) color: 'info' | 'danger' | 'success' | 'warning' = 'info';

  /** specifies time in seconds for the toast to be displayed */
  @Prop() duration: 3 | 5 | 10;

  /** When set, specifies that the toast is open */
  @Prop({ reflect: true }) open: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {

    if(this.open && this.duration){
      setTimeout(() => { this.open = false }, this.duration * 1000)
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
