import { Component, Element, Event, EventEmitter, Listen, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-toggle',
  styleUrl: 'cbp-toggle.scss',
})
export class CbpToggle {

  @Element() host: HTMLElement;
  
  /** Marks the toggle as checked by default when specified. */
  @Prop({ reflect: true }) checked: boolean;

  /** Marks the toggle in a disabled state when specified. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Determines if the status text is visible for the render*/
  @Prop({ reflect: true }) hideStatus: boolean;

  /** Determines the status text for the true toggle*/
  @Prop({ reflect: true }) statusTextOn: string;

  /** Determines the status text for the false toggle*/
  @Prop({ reflect: true }) statusTextOff: string;

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

  @Listen('keydown')
  handleKeyDown( ev: KeyboardEvent){
    if(ev.key === ' '){
      this.toggleEvent();
    }
  }

  @Event() toggleClick: EventEmitter;

  /** Event: toggles the control true/false & updates DOM accordingly*/
  toggleEvent(){
    let checkbox = this.host.querySelector('input[type="checkbox"]');

    if(this.checked && !this.disabled){
      this.checked = false;
      checkbox.setAttribute('checked', 'false');
    }else if(!this.disabled) {
      this.checked = true;
      checkbox.setAttribute('checked', 'true');
    }
  }

  render() {
    let ariaLabel = this.host.querySelector('label').textContent;
    let ariaCheck = this.checked;

    if(this.hideStatus){
      return (
      <Host
        role='checkbox'
        aria-checked={ariaCheck}
        aria-label={ariaLabel}
        tabindex='0'
        onClick={() => this.toggleEvent()}
        >
        <slot name='toggleLabel'></slot>
        <span class='slider' />
        <slot></slot>
          <span>
            {this.checked ? this.statusTextOn : this.statusTextOff}
          </span>

      </Host>
      );
    }else{
      return (
        <Host
          role='checkbox'
          aria-checked={ariaCheck}
          aria-label={ariaLabel}
          tabindex='0'
          onClick={() => this.toggleEvent()}
          >
          <slot name='toggleLabel'></slot>
          <span class='slider' />
          <slot></slot>
        </Host>
      );
    }
  }

}
