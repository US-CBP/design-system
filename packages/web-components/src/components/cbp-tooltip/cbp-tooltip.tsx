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

  @State() hoverExitTimeout:boolean = false;
  private timeoutId = undefined;

  /** When set, specifies that the tooltip is open */
  @Prop({ reflect: true }) open: boolean = false;

  /** Optionally specifies the tooltip height in CSS units (preferably relative units such as rem). */
  @Prop() height: string;
 
  /** Optionally specifies the tooltip width in CSS units (preferably relative units such as rem). */
  @Prop() width: string;

  /** used to set styles for the definition link for text controls*/
  @Prop({ reflect: true }) variant: 'definition';

  /** sets where the tooltip will be displayed and where the caret will be placed */
  @Prop({ reflect: true}) position: "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end" = "top";
  
  /**
   * Optionally specify the ID of the tooltip, which is used to associate it to the control for accessibility purposes.
   * If not specified, an ID will be generated automatically.
   */
  @Prop() uid: string = createNamespaceKey('cbp-tooltip');

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

  hoverTooltip(hovered){

    if(typeof this.timeoutId === "number"){
        clearTimeout(this.timeoutId)
        this.timeoutId = undefined;
      }

    if(hovered && !this.open){
      this.hoverExitTimeout = true;
      this.open= true;
    }else if(this.hoverExitTimeout && !hovered){      
      this.timeoutId = setTimeout(() => {
        this.hoverExitTimeout = false;
        this.open=false;
      }, 250);
    }
  }

  handleClick(e){
    if (!this.floatingEl.contains(e.target)){
      this.hoverExitTimeout = false;
      this.host.focus();
      this.open = true;
    }
  }

  handleFocus(){
    if(!this.open) { this.open = true}
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
    return ( //todo: add a keydown for space or enter to call the onclick
      <Host 
        aria-describedby={`${this.uid}`}
        role="button"
        tabindex="0"  
        onmouseover={() => this.hoverTooltip(true)}
        onmouseout={() => this.hoverTooltip(false)}
        onfocus={() => this.handleFocus()}
        onClick={(e) => this.handleClick(e)}
        onKeydown={(e) => {if (e.key === 'Enter' || e.key === ' '){this.handleClick(e)}}}
        ref={el => (this.control = el)}
      >
        <slot />

        <div 
          role="tooltip" 
          id={`${this.uid}`} 
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
            onClick={() => this.dismissTooltip()}
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
