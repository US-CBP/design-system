import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
  
/**
 * Label to be displayed in the control of the treeview.
 */
@Prop({ reflect: true}) label: string;

/**
 * determines if the component is in an open or expanded state
 */
@Prop({reflect: true}) open: boolean = false;


toggleOpen(){
  this.open === false ? this.open = true : this.open = false;
}

  render() {
    return (
      <Host>
        <span class="cbp-treeview-control">
          <cbp-button
            variant="square"
            color="secondary"
            fill="ghost"
            class="cbp-treeview-toggle"
            onClick={() => {this.toggleOpen()}}
            targetProp="open"
          >
            <cbp-icon name="caret-down"></cbp-icon>
          </cbp-button>
          <slot name="treeview-checkbox-control"></slot>  
          <span>{this.label}</span>
          <slot name="treeview-button-control"></slot> 
        </span>
        <div class="cbp-treeview-content">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
