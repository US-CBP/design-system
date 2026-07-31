import { Component, Prop, Element, Host, h, Listen, State } from '@stencil/core';
import { setCSSProps, createNamespaceKey, getInvertedContext, clickAwayListener } from '../../utils/utils';
import { floatUI, floatUIProps } from '../../utils/floatingPlacement';

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

  @Element() private host: HTMLElement;
  private arrow: HTMLElement;
  private control: HTMLElement;
  private floatingEl: HTMLElement;

  @State() hoverActivated:boolean = false;
  private timeoutId = undefined;

  /** When set, specifies that the tooltip is open */
  @Prop({ reflect: true }) open: boolean = false;

  /** Specifies the dialog height in CSS units (preferably relative units such as rem). */
  @Prop() height: string;
 
  /** Specifies the dialog width in CSS units (preferably relative units such as rem). */
  @Prop() width: string;

  /** used to set styles for the definition link for text controls*/
  @Prop({ reflect: true }) variant: 'definition';

  /** sets where the tooltip will be displayed and where the caret will be placed */
  @Prop({ reflect: true}) position: "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end" = "top";
  
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
      '--cbp-tooltip-height': this.height,
      '--cbp-tooltip-width': this.width,
      ...this.sx,
    });
  }

  hoverTooltip(x){

    if(typeof this.timeoutId === "number"){
        clearTimeout(this.timeoutId)
        this.timeoutId = undefined;
      }

    if(x && !this.open){
      this.hoverActivated = true;
      this.open= true;
    }else if(this.hoverActivated && !x){      
      this.timeoutId = setTimeout(() => {
        this.hoverActivated = false;
        this.open=false;
      }, 1000);
    }
  }

  handleClick(){
    this.hoverActivated = false;
    this.host.focus();
  }

  handleFocus(){
    !this.open ? this.open = true : '';
    clickAwayListener(this.host, _ => {this.open = false})    
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

componentDidRender(){
    if(this.open){
   
    const floatUiprops: floatUIProps= {
        placement: this.position,
        offset: {
          mainAxis: 16,
        },
        flip: true,
        shift: true,
        arrow: this.arrow
      }

      floatUI(floatUiprops, this.control, this.floatingEl);
    }
  }

  render() {
    return (
      <Host 
        aria-describedby={`${this.fieldId}`}
        role="button"
        tabindex="0"  
        onmouseover={() => this.hoverTooltip(true)}
        onmouseleave={() => this.hoverTooltip(false)}
        onfocus={() => this.handleFocus()}
        onClick={() => this.handleClick()}
        ref={el => (this.control = el)}
      >
        <slot />

        <div 
          role="tooltip" 
          id={`${this.fieldId}`} 
          ref={el => (this.floatingEl = el)}
        >
          <div>
            <slot name="cbp-tooltip-content" ></slot>
          </div>
          <cbp-button
            class="cbp-tooltip-close"
            type="button"
            fill="ghost"
            color="secondary" 
            context={this.invertContext()}
            variant="square"
            accessibilityText="Close Tooltip"
            onClick={() => this.dismissTooltip()} //TODO: recursively focusing to open tooltip, so close button not working
            onKeyDown={(e) => this.handleFocusOut(e)}
          >
            <cbp-icon name="circle-xmark" size="var(--cbp-space-5x)"></cbp-icon>
          </cbp-button>
          <div class="cbp-tooltip-arrow" ref={el => (this.arrow = el)}></div>
        </div>
      </Host>
    );
  }

}
