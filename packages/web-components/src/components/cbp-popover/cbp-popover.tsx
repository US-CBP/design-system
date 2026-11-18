import { Component, Element, Host, h, Method, Prop} from '@stencil/core';
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

  /** sets where the popover will be displayed and where the caret will be placed */
  @Prop({ reflect: true }) position: "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end" = "top";
  
  /** sets the popover into a danger state visually */
  @Prop({ reflect: true }) danger: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  // /** A public method for opening the popover. */
  // @Method()
  // async openPopover() { //TODO: is this needed?
  //   this.open = true;
  //   // this.dialogOpen.emit({
  //   //   host: this.host,
  //   //   open: this.open,
  //   // });
  // }

  // /** A public method for closing the popover. */
  // @Method()
  // async closePopover() { //TODO: is this needed?
  //   this.open = false;
  //   // this.dialogClose.emit({
  //   //   host: this.host,
  //   //   open: this.open,
  //   // });
  // }

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
    this.control = this.host.querySelector(`[controls=` + this.host.id + `]`); //TODO: refactor this? assumes use of the control attribute which could be weak
    console.log('control/floating: ',this.position, this.host.id, this.control, this.floatingEl)
    if(this.open){
      const floatUiprops: floatUIProps= {
          placement: this.position,
          offset: {
            mainAxis: 16,
          },
          // flip: true,
          // shift: true,
          // arrow: this.arrow
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
        <slot name="cbpPopoverContent"></slot>
        <slot name="cbpPopoverActions"></slot>
      </Host>
    );
  }

}
