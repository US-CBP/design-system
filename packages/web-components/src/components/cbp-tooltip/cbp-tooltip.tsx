import { Component, Prop, Element, Host, h, Listen } from '@stencil/core';
import { setCSSProps, createNamespaceKey, getInvertedContext } from '../../utils/utils';

/**
 * The Tooltip component allows for the disclosure of supplemental, non-essential information via a triggering element.
 * 
 * @slot - The tooltip control label is provided in the default slot.
 * @slot cbp-tooltip-content - The tooltip content is placed in this named slot.
 */
@Component({
  tag: 'cbp-tooltip',
  styleUrl: 'cbp-tooltip.scss'
})
export class CbpTooltip {

  @Element() host: HTMLElement;
  /** When set, specifies that the tooltip is open */
  @Prop({ reflect: true }) open: boolean = false;

  /** used to set styles for the definition link for text controls*/
  // @Prop({ reflect: true }) definitionLinkStyle: boolean = false;
  @Prop({ reflect: true }) variant: 'definition';


  /** sets where the tooltip will be displayed and where the caret will be placed */
  @Prop({ reflect: true}) alignment: "top-left" | "top-center" | "top-left" | "right-top" | "right-center" | "right-bottom" | "bottom-left" | "bottom-center" | "bottom-right" | "left-top" | "left-center" | "left-bottom";
  
  /** Optionally specify the ID of the visible control here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-tooltip');

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
    this.host.focus();
    this.open =false;
  }

  handleFocusOut({ key, shiftKey }) {
    if(key == 'Tab' && !shiftKey) this.open = false
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent){
    if( ev.key == 'Escape'){
      this.dismissTooltip();
    }
  }

  invertContext(){
    let currentElement = this.host;
    let context;

    while(currentElement) {
      //check for parent context or data-cbp-theme value to invert
      if(currentElement.hasAttribute('context') || currentElement.hasAttribute('data-cbp-theme')){ 
        if(currentElement.hasAttribute('context')){
          context = currentElement.getAttribute('context')
        }else {
          context = currentElement.getAttribute('data-cbp-theme')
        }
        return getInvertedContext(context)
      }
      currentElement = currentElement.parentElement;
    } 
  }

  render() {
    return (
      <Host 
        aria-describedby={`${this.fieldId}`}
        role="button"
        tabindex="0"  
        onfocus={() => this.open=true}
        onClick={() => this.host.focus()}
      >
        <slot />

        <div role="tooltip" id={`${this.fieldId}`}>
          <div>
            <slot name="cbp-tooltip-content"></slot>
          </div>
          <cbp-button
            class="cbp-tooltip-close"
            type="button"
            fill="ghost"
            color="secondary" 
            context={this.invertContext()}
            variant="square"
            onClick={() => this.dismissTooltip()}
            onKeyDown={(e) => this.handleFocusOut(e)}
          >
            <cbp-icon name="circle-xmark" size="var(--cbp-space-5x)"></cbp-icon>
          </cbp-button>
        </div>
      </Host>
    );
  }

}
