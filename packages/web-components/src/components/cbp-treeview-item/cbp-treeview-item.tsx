import { Component, Element, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
  
@Element() host: HTMLElement;

@Prop({reflect: true}) parent: boolean;

/**
 * Label to be displayed in the control of the treeview item.
 */
@Prop({ reflect: true}) label: string;

/**
 * determines if the component is in an open or expanded state
 */
@Prop({reflect: true, mutable: true}) open: boolean = false;

/**
 * determines if the control for the treeview-item is slotted, if true the default checkbox will not be rendered
 */
@Prop() slottedControl: boolean;

@Listen('stateChanged')
  handleCheck(e){
    //TODO: need logic for clear parent/children nodes when unchecked
    let checkbox = e.target;
    let treeviewItem = checkbox.closest('cbp-treeview-item');
    let treeviewItemContent = treeviewItem.querySelector('.cbp-treeview-content');

    // console.log(checkbox)
    // console.log('Event treeviewitem: ', treeviewItem)
    // console.log('Content: ', treeviewItemContent);

    //TODO: need boolean return on let to determine if the parent has any other selected children
    if(treeviewItem.closest('.cbp-treeview-content').children){
      let treeviewItemSiblings = treeviewItem.closest('.cbp-treeview-content').children; // throwing error for non parent nodes... need to sync on this, feels like i am missing something obvious
      // console.log('TreeviewItemSiblings: ', treeviewItemSiblings)
    
      for( const item of treeviewItemSiblings) {
        let itemCheckbox = item.querySelector('cbp-checkbox') as HTMLCbpCheckboxElement
        if(itemCheckbox.checked){
        console.log('item: ', itemCheckbox) //TODO: local testing, remove
        }
      }
    }
    if(this.host.contains(checkbox) && this.host != treeviewItem) {
      //TODO: rename var for better verbage?
      let x = this.host.querySelector('.cbp-treeview-control cbp-checkbox') as HTMLCbpCheckboxElement; 
      if(checkbox.checked){//TODO: need logic for selected or indeterminate here based on above TODO ln 40 
        x.indeterminate= true;  
      } 
      else {
        x.indeterminate = false; //TODO: this might be unnessecary if the component manages it, need to verify
        x.checked = false;
      }
     }

    if (treeviewItemContent.querySelectorAll('cbp-checkbox')) { 
      //TODO: rename var for better verbage? 
      let x = treeviewItemContent.querySelectorAll('cbp-checkbox') as HTMLCbpCheckboxElement[];
      x.forEach(a => {
        if(checkbox.checked == true){
          a.checked = true;
        } else{ 
          a.checked = false;
        }
      });
    }
  }

toggleOpen(){
  this.open === false ? this.open = true : this.open = false;
}

  render() {

    if(this.host.querySelector('cbp-treeview-item')){
      this.parent = true;
    }
  
    // setTimeout(() => {
    // console.log('Treeview Item: ', this.host);
    // // console.log('Treeview checkbox: ', this.host.querySelectorAll('& > .cbp-treeview-control cbp-checkbox input[type="checkbox"]')); 
    // console.log('Treeview checkbox: ', this.host.querySelector('.cbp-treeview-control cbp-checkbox input[type="checkbox"]')); 
    // console.log('----------------------------------')
    // }, 500);

    return (
      <Host
        role="treeitem"
        aria-expanded={this.open ? 'true' : 'false'}
      >
        <span class="cbp-treeview-control">
          {this.parent &&
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
          } 
          
          {!this.slottedControl &&
            <cbp-checkbox>
              <input type="checkbox" name="checkbox" />
            </cbp-checkbox>
          }
          
          <span>{this.label}</span>

          {this.slottedControl &&
            <slot name="treeview-button-control"></slot> 
          }

          </span>
        {this.parent && 
          <div class="cbp-treeview-content">
            <slot></slot>
          </div>
        }  
      </Host>
    );
  }

}
