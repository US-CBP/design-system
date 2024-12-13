import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-toggle',
  styleUrl: 'cbp-toggle.scss',
})
export class CbpToggle {

  @Element() host: HTMLElement;
  
  /** Marks the toggle as checked by default when specified. */
  @Prop() checked: boolean;

  /** Marks the toggle in a disabled state when specified. */
  @Prop() disabled: boolean;

  /** Determines if the status text is visible for the render*/
  @Prop() hideStatus: boolean = true;

  /** Determines the status text for the true toggle*/
  @Prop() statusTextOn: string = 'on';

  /** Determines the status text for the false toggle*/
  @Prop() statusTextOff: string = 'off';

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

  /** Event: toggles the control true/false & updates DOM accordingly*/
  toggleEvent(){
    //TODO: logic here
  }

  render() {
    /**boilerplate HTML */
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
