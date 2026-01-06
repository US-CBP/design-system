import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview',
  styleUrl: 'cbp-treeview.scss',
})

export class CbpTreeview {
  
  /**
   * Label to be displayed in the control of the treeview.
   */
  @Prop({ reflect: true}) label: string;

  render() {
    return (
      <Host
        role="tree"
        aria-label={this.label}
      >
        
        <slot name='cbp-treeview-label-icon'></slot>
        <cbp-typography //TODO: does this need to be conditionally rendered? 
          variant="heading-sm" //TODO: need to validate with designer this is styled correctly
          divider="underline"
        >
          {/* <cbp-icon name="user"></cbp-icon> */}
          {this.label ? this.label : ''}
        </cbp-typography>
        <slot></slot>
      </Host>
    );
  }

}
