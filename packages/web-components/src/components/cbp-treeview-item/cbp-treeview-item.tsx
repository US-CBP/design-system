import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
@Element() host: HTMLCbpTreeviewItemElement;

/**
 * Label to be displayed in the control of the treeview item.
 */
@Prop({ reflect: true}) label: string;

/**
 * determines if the component is in an open or expanded state
 */
@Prop({reflect: true, mutable: true}) open: boolean = false;

/**
 * determines if the control renders with a checkbox as part of the treeview-item control
 */
@Prop() selectable: boolean;

/**
 * used to determing if the treeviewItem is in a checked state
 */
@Prop({reflect: true, mutable: true}) checked: boolean; 

/**
 * used to determing if the treeviewItem is in an indeterminate state
 */
@Prop({reflect: true, mutable: true}) indeterminate: boolean; 

@Event() updateParent: EventEmitter;

/** Specifies a unique `ID` for the dialog, used to wire up the controls and accessibility features. */
@Prop() uid: string;

private children = [];
private allChildren = [];

/**displays number of direct children slotted into parent */
private directChildren;

private parent;

private checkbox !: HTMLCbpCheckboxElement

@Listen('stateChanged')
  handleCheck(e = undefined){
    e?.stopPropagation();

    let checkbox = e?.target || this.checkbox;

    this.checked = checkbox.checked;

    this.allChildren.forEach(a =>{
      let childCheckbox = a.querySelector('cbp-checkbox');
      checkbox.indeterminate = false;

      if (checkbox.checked){
        a.checked = true;
        childCheckbox.checked = true;
      }else{
        a.checked = false;
        childCheckbox.checked = false;
      }
    })

    this.updateParent.emit({
      host: this.host,
      parent: this.parent,
      checked: checkbox
    })
  }
    
  @Listen('updateParent')
    handleUpdateParent(e){
      if(this.host == e.detail.parent){

      let selectedChildren = 0;
      let allSelectedChildren = 0;
      let indeterimateChild = false;

      for (let i = 0; i < this.children.length; i++){
        if(this.children[i].checked){ 
        selectedChildren= selectedChildren + 1;
        }else if(this.children[i].indeterminate){
          indeterimateChild = true;
        }
      }

      for(let i = 0; i < this.allChildren.length; i++){
        if(this.allChildren[i].checked){
          allSelectedChildren = allSelectedChildren + 1;
        }
      }

    if(this.children.length == selectedChildren && this.allChildren.length == allSelectedChildren){
      this.checkbox.checked = true;
      this.host.checked = true
      this.checkbox.indeterminate = false;
      this.host.indeterminate = false;
    }else if(this.children.length > selectedChildren && selectedChildren != 0 && this.allChildren.length > allSelectedChildren || indeterimateChild){
      this.checkbox.checked = false;
      this.host.checked = false;
      this.checkbox.indeterminate = true;
      this.host.indeterminate = true;
    }else{
      this.checkbox.checked = false;
      this.host.checked = false;
      this.checkbox.indeterminate = false;
      this.host.indeterminate = false;
    }

    this.updateParent.emit({
      host: this.host,
      parent: this.parent,
      checked: this.host.querySelector('cbp-checkbox')
    })
  }
  }

  toggleOpen(){
    this.open === false ? this.open = true : this.open = false;
  }

componentDidLoad(){
  if(this.checked){
    this.handleCheck()
  }
}

  componentWillLoad(){ 
    this.parent = this.host.parentElement.closest("cbp-treeview-item")
    
    if(this.host.lastElementChild != null){
      this.directChildren = this.host.children.length
    }

    this.children = [...this.host.children]
    this.allChildren = this.host.querySelectorAll('cbp-treeview-item') as unknown as HTMLCbpTreeviewItemElement[];
   
  }

  render() {
  
    return (
      <Host
        role = "treeitem"
        id = {this.uid}
        aria-selected = {this.checkbox}
      >
        <span class="cbp-treeview-control">
          {this.directChildren > 0 && 
            <cbp-button
              variant="square"
              color="secondary"
              fill="ghost"
              class="cbp-treeview-toggle"
              onClick={() => {this.toggleOpen()}}
            >
              <cbp-icon name="caret-down"></cbp-icon>
            </cbp-button>
          }
          {!this.selectable &&
            <cbp-checkbox 
              ref={(el) => this.checkbox = el as HTMLCbpCheckboxElement}
              checked = {this.checked}>
              <input type="checkbox"/>
              {this.directChildren ? this.label + ' (' + this.directChildren + ')' : this.label}
            </cbp-checkbox>
          }
        </span>
          <div 
            class="cbp-treeview-content" 
            role='group'  
          >
            <slot></slot>
          </div>
      </Host>
    );
  }

}
