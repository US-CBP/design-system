import { Component, Element, Host, h, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
import { floatUI, floatUIProps } from '../../utils/floatingPlacement';

@Component({
  tag: 'cbp-popover',
  styleUrl: 'cbp-popover.scss',
})
export class CbpPopover {
  @Element() private host: HTMLElement;

  // private arrow: HTMLElement;
  private control: HTMLElement;
  private floatingEl: HTMLElement;
  // @Prop() drag: //TODO: see spec


  /** When set, specifies that the popover is open */
  @Prop({ reflect: true }) open: boolean;

  /** Specifies the popover height in CSS units (preferably relative units such as rem). */
  @Prop() height: string;

  /** Specifies the popover width in CSS units (preferably relative units such as rem). */
  @Prop() width: string;

  /** Specifies the element that popover is in reference too*/
  @Prop() controlSelector: string

  /** sets where the popover will be displayed and where the caret will be placed */
  @Prop({ reflect: true }) position: "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end" = "top";
  
  /** sets the popover into a danger state visually */
  @Prop({ reflect: true }) danger: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  componentDidLoad() {
    setCSSProps(this.host, {
      'height': this.height,
      'width': this.width,
      ...this.sx,
    });
    // If the dialog is open on initial load, set focus
    //this.open && this.setFocus(); // this is handled by the focus trap now
  }

  componentDidRender() {
    //TODO: working with the story control headerClose:true but not otherwise??? ==> seems to start correct then 'move' as you close & open it
    this.control = document.querySelector(this.controlSelector); //TODO: alignment left seems to be having a componding width expansion?
    console.log('control/floating: ',this.position, this.controlSelector, this.control, this.floatingEl)
    if(this.open){
      const floatUiprops: floatUIProps= {
          placement: this.position,
          offset: {
            mainAxis: 16,
          },
          flip: true,
          shift: true,
        }
  
        floatUI(floatUiprops, this.control, this.floatingEl);
      }
  }

  render() {
    return (
      <Host
        ref={el => (this.floatingEl = el)}
      >
        <slot name="cbpPopoverHeader"></slot>
        <slot></slot>
        <slot name="cbpPopoverActions"></slot>
      </Host>
    );
  }

}
