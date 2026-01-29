import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview',
  styleUrl: 'cbp-treeview.scss',
})

export class CbpTreeview {
  
  /**
   * Label to be displayed in the control of the treeview.
   */
  @Prop({ reflect: true}) accessibilitylabel: string;

  render() {
    return (
      <Host
        role="tree"
        aria-label={this.accessibilitylabel}
      >
        
        <slot name="label"></slot>
        <cbp-typography  
          variant="heading-sm" 
          divider="underline"
        >
          <slot name='cbp-treeview-label-icon'></slot>
        </cbp-typography>
        <slot></slot>
      </Host>
    );
  }

}
