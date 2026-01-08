import { Component, Element, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
@Element() host: HTMLElement;

/**
 * determines if treeviewItem is a parent to other treeviewItems
 */
@Prop({reflect: true}) parent: boolean;

/**
 * children treeview items of a parent treeview item
 */
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

private treeviewItemSiblings;
private checkedSiblings = [];

content !: HTMLElement

@Listen('stateChanged')
  handleCheck(e){
    e.stopPropagation();

    let checkbox = e.target;
    let treeviewItem = checkbox.closest('cbp-treeview-item');

    if(this.host == treeviewItem){
      this.treeviewItemChecked = true;
    } else{
      this.treeviewItemChecked = false;
    }

    if (this.content && this.content.querySelectorAll('cbp-checkbox')) { 
      let childCheckbox = this.content.querySelectorAll('cbp-checkbox') as unknown as HTMLCbpCheckboxElement[];
        childCheckbox.forEach(a => {
        a.indeterminate = false;
        if(checkbox.checked == true){
          a.checked = true;
        } else{ 
          a.checked = false;
        }
      });
    }
    this.updateSelectedCount();
    this.handleUpdateParent();
  }
    
  handleUpdateParent(){
    
   let parent = this.host.parentNode.parentNode as HTMLCbpTreeviewItemElement;
   let parentCheckbox = parent.querySelector("cbp-checkbox") as HTMLCbpCheckboxElement; 

    if(this.treeviewItemSiblings.length == this.checkedSiblings.length){
      parentCheckbox.checked = true;
      parentCheckbox.indeterminate = false;
    }else if(this.treeviewItemSiblings.length > this.checkedSiblings.length && this.checkedSiblings.length != 0){
      parentCheckbox.checked = false;
      parentCheckbox.indeterminate = true;
    }else{
      parentCheckbox.checked = false;
      parentCheckbox.indeterminate = false;
    }
  }

  updateSelectedCount(){
    this.checkedSiblings = [];
    for (let i = 0; i < this.treeviewItemSiblings.length; i++){
      if(this.treeviewItemSiblings[i].querySelector('input[type="checkbox"]:checked')){
        this.checkedSiblings.push(this.treeviewItemSiblings[i]);
      }
    }
  }

  toggleOpen(){
    this.open === false ? this.open = true : this.open = false;
  }

  componentDidRender(){
    if(this.content){
      this.childrenItems = this.content.children.length;
    }

    this.treeviewItemSiblings= this.host.parentNode.children
    this.updateSelectedCount();
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
          <div class="cbp-treeview-content" ref={(el) => this.content = el as HTMLElement}>
            <slot></slot>
          </div>
        }  
      </Host>
    );
  }

}
