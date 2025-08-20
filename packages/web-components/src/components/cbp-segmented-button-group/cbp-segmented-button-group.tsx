import { Component, Prop, Element, Event, EventEmitter, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/** 
 * The Segmented Button Group component wraps multiple buttons and can be used as a multi-option 
 * toggle or group of controls.
 * 
 * @slot - Only `cbp-button` components should be slotted within the default slot to make up the button group. 
 */
@Component({
  tag: 'cbp-segmented-button-group',
  styleUrl: 'cbp-segmented-button-group.scss'
})
export class SegmentedButtonGroup {

  // An array of all buttons registered (loaded)
  private buttongroup = [];

  @Element() host: HTMLElement;

  /** 
   * Optionally specifies the name of the (hidden) form field as a formData key 
   * when a value is intended to be passed. 
   */
  @Prop() name: string;

  /** 
   * Optionally specifies a value of the group as a way to set the initial button pressed states and/or
   * to be passed as part of submitted formData when a name is also specified. 
   * Requires that the individual buttons have a value specified for the group to pass a value.
   */
  @Prop({ mutable: true }) value: any; //string | object;

  /** Specifies whether multiple buttons may be activated at the same time. Defaults to false. */
  @Prop() multiple: boolean;

  /** Specifies accessibility text used to label the group, applied to the group via aria-label. */
  @Prop() accessibilityText: string;

  /* TODO: not yet implemented  */
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
    // Toggle "pressed" prop on the button only when multiple selections are allowed; 
    // otherwise, it acts like a radio list and a click selects it but doesn't deselect it.
    if (this.multiple) host.pressed = (host.pressed == "true") ? "false" : "true";
    else host.pressed = "true";

    // if a button was toggled to "pressed," toggle the rest unpressed for groups that only allow a single buttons pressed.
    //console.log(this.multiple, host.pressed);

    if(!this.multiple && host.pressed) {
      this.buttongroup.forEach(el => {
        if(el !== host){
          el.pressed="false";
        }
      });
    }

    // Give the buttons time to update before getting the value from them.
    setTimeout(() => {
      this.setValueFromButtons();

      // Emit a custom event so that the developer can listen to the group instead of each individual button.
      this.segmentedButtonGroupClick.emit({
        host: this.host,
        value: this.value,
        button: element,
        buttonValue: value,
        pressed: host.pressed,
      });
    },10);
  }

  @Watch('value')
  watchValueHandler(newValue) {
    let values=[];
    if (typeof newValue == 'object') values = newValue;
    else if (typeof newValue == 'string') values = newValue.split(',');
    // Set pressed states based on the value(s)    
    this.buttongroup.forEach( (item) => {
      item.pressed = `${values.includes(item.value)}`
    });
  }

  setValueFromButtons() {
    let values = [];
    const PressedButtons: HTMLCbpButtonElement[] = Array.from(this.host.querySelectorAll('cbp-button[pressed=true]'));
    PressedButtons.forEach( item => {
      if (item.value != undefined) {
        values = [...values, item.value]
      }
    });
    if(values.length > 0) this.value=values;
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    // Set the pressed state of each button to "false" if it's not set to "true" already.
    this.buttongroup.forEach( cbpButton => {
      if(cbpButton.pressed !== "true"){
        cbpButton.pressed="false";
      }
    });

    // Set the pressed states from the value, if set
    if(this.value != undefined) this.watchValueHandler(this.value);
    // Set the value from the pressed states
    else this.setValueFromButtons();
  }


  render() {
    return (
      <Host role="group" aria-label={this.accessibilityText}>
        <slot />
        { this.name && 
            <input type="hidden" name={this.name} value={this.value} />
        }
      </Host>
    );
  }
}
