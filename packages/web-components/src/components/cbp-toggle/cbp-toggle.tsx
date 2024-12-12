import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-toggle',
  styleUrl: 'cbp-toggle.scss',
})
export class CbpToggle {

  @Element() host: HTMLElement;
  
  /**  Specifies if the toggle is enabled*/
  @Prop({ reflect: true}) selected: boolean;

  /** Specifies the label of the toggle */
  @Prop() label!: string;

  /** Specifies the variant of the toggle*/
  @Prop() variant: 'boolean' | 'transform';
  
  /** Specifies width of toggle, meant for 'stacked' displays*/
  @Prop() width: CSSPropertyRule;

  /** Specifies the gap property of the toggle*/
  @Prop() gap: CSSPropertyRule;

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
    /**boilerplate HTML. TODO: review if cbp-typography && \ || cbp-checkbox is a better fit here. 
     * .slider is copied from vanilla code, used for styling. might be replacable with a ::before
    */
    return (
      <Host>
        <label>{this.label}</label>
        <input
          type='checkbox'
        ></input>
        <span class='slider'></span>
      </Host>
    );
  }

}
