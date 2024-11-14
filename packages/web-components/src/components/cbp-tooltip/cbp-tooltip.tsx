import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-tooltip',
  styleUrl: 'cbp-tooltip.scss'
})
export class CbpTooltip {

  
  @Element() host: HTMLElement;
  /** When set, specifies that the tooltip is open */
  @Prop({ reflect: true }) open: boolean = false;
 
  //todo: update from alignment to placement
  @Prop({ reflect: true}) alignment: "top-left" | "top-center" | "top-left" | "right-top" | "right-center" | "right-bottom" | "bottom-left" | "bottom-center" | "bottom-right" | "left-top" | "left-center" | "left-bottom";
  
  /** Specifies a unique `ID` for the tooltip, used to wire up the controls and accessibility features. */
  @Prop() uid: string;

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

  dismissTooltip(){
    console.log('oh no it blew up');
    this.host.focus();
    this.open =false;
  }

  render() {
    
    return (
      <Host 
        id={this.uid}
        tabindex='0'  
        onfocus={() => this.open=true}
        onClick={() => this.host.focus()}
        role='button'
      >
        <slot></slot>
        <div role='tooltip'>
          <div>
            <slot name='cbp-tooltip-content'></slot>
          </div>
          <cbp-button
            class='cbp-tooltip-close'
            type="button"
            fill="ghost"
            color="secondary" 
            context={(this.context == 'dark-always' || this.context == 'dark-inverts')? "light-always":"dark-always"}
            variant="square"
            onClick={() => this.dismissTooltip()}
            onFocusout={() => this.dismissTooltip()}
          >
            <cbp-icon name="circle-xmark"></cbp-icon>
          </cbp-button>
        </div>
      </Host>
    );
  }

}
