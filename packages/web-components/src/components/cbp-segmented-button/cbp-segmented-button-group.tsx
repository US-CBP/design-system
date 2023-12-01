import { Component, Prop, Element, Event, EventEmitter, Listen, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-segmented-button-group',
  styleUrl: 'cbp-segmented-button-group.scss'
})
export class SegmentedButtonGroup {

  // An array of all buttons registered (loaded)
  private buttongroup = [];

  @Element() host: HTMLElement;

  @Prop() multiple: boolean;
  @Prop() accessibilityText: string;
  @Prop() disabled: boolean;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() segmentedButtonGroupClick: EventEmitter;

  @Listen('componentLoad')
  handleComponentLoad({ detail: { nativeElement: element, host } }) {
    if (element) {
      this.buttongroup = [
        ...this.buttongroup, host
      ];
    }
  }

  @Listen('buttonClick')
  handleButtonClick({ detail: { nativeElement: element, host, value } }) {
    // Toggle "pressed" prop on the button
    host.pressed=!host.pressed;

    // if a button was toggled to "pressed," toggle the rest unpressed for groups that only allow a single buttons pressed.
    if(!this.multiple && host.pressed) {
      this.buttongroup.forEach(el => {
        if(el != element){
          el.pressed=false;
        }
      });
    }

    // Emit a custom event so that the developer can listen to the group instead of each individual button.
    this.segmentedButtonGroupClick.emit({
      detail: {
        host: this.host,
        button: element,
        value: value,
        pressed: host.pressed,
      }
    });
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    return (
      <Host role="group" aria-label={this.accessibilityText}>
        <slot />
      </Host>
    );
  }
}
