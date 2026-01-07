import { Component, Element, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
@Element() host: HTMLElement;

@Prop({reflect: true}) parent: boolean;
// @Prop({mutable: true}) childrenItems: number;
@Prop({mutable: true}) childrenItems;

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

@Prop({mutable: true}) treeviewItemChecked: boolean;

@Listen('stateChanged')
  handleCheck(e){
    let checkbox = e.target;
    let treeviewItem = checkbox.closest('cbp-treeview-item');
    let treeviewItemContent = treeviewItem.querySelector('.cbp-treeview-content');

    // console.log(checkbox)
    // console.log('Event treeviewitem: ', treeviewItem)
    // console.log('Content: ', treeviewItemContent);

    //TODO: notes from sync need 2 query select for any item that has children and one for all the children
    // let allChildren =[... this.host.closest('cbp-treeview').querySelectorAll('cbp-treeview-item cbp-checkbox')] as HTMLCbpCheckboxElement[];
    
    // console.log('allChildren: ', allChildren);
    // console.log('selected: ', selected);

    let treeviewItemSiblings= treeviewItem.parentNode.children;
    let checkedSiblings = [];
    for (let i = 0; i < treeviewItemSiblings.length; i++){
      if(treeviewItemSiblings[i].querySelector('input[type="checkbox"]:checked')){
        checkedSiblings.push(treeviewItemSiblings[i]);
      }
    }

    // console.log('treeviewItemSiblings: ', treeviewItemSiblings);
    // console.log('siblings: ', checkedSiblings) 

    if(this.host == treeviewItem){
      this.treeviewItemChecked = true;
    } else{
      this.treeviewItemChecked = false;
    }

    if(this.host.contains(checkbox) && this.host != treeviewItem) {
      let parentCheckbox = this.host.querySelector('.cbp-treeview-control cbp-checkbox') as HTMLCbpCheckboxElement; 
      if(checkbox.checked){//TODO: closer, still seeing some weirdness on the grandparent+
        if(checkedSiblings.length == treeviewItemSiblings.length){
          parentCheckbox.checked = true;
          parentCheckbox.indeterminate = false;
        } else {
          parentCheckbox.indeterminate= true;  
          parentCheckbox.checked = false;
        }
        
      } 
      else {
        parentCheckbox.indeterminate = false;
        parentCheckbox.checked = false;
      }
     }

    if (treeviewItemContent && treeviewItemContent.querySelectorAll('cbp-checkbox')) { 
      let childCheckbox = treeviewItemContent.querySelectorAll('cbp-checkbox') as HTMLCbpCheckboxElement[];
      childCheckbox.forEach(a => {
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

  componentDidRender(){
    if(this.host.querySelector('.cbp-treeview-content')){
      this.childrenItems = this.host.querySelector('.cbp-treeview-content').children.length;
    }
  }

  render() {

    if(this.host.querySelector('cbp-treeview-item')){
      this.parent = true;
    }
  
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

          <span>{this.childrenItems ? this.label + ' (' + this.childrenItems + ')' : this.label}</span>

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
