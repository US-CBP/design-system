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
        
        <slot name="label"></slot>
        <cbp-typography  
          variant="heading-sm" 
          divider="underline"
        >
          <slot name='cbp-treeview-label-icon'></slot>
          {this.label ? this.label : ''}
        </cbp-typography>
        <slot></slot>
      </Host>
    );
  }

}
