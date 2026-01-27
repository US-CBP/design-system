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
@Prop({reflect: true, mutable: true}) treeviewItemChecked: boolean; //TODO: does this need reflect? used for local testing confrimation but not sure this should be in final

/**
 * used to determing if the treeviewItem is in an indeterminate state
 */
@Prop({reflect: true, mutable: true}) treeviewItemIndeterminate: boolean; //TODO: does this need reflect? used for local testing confrimation but not sure this should be in final

@Event() treeviewItemUpdate: EventEmitter;

/** Specifies a unique `ID` for the dialog, used to wire up the controls and accessibility features. */
@Prop() uid: string;

private children = [];
private allChildren = [];

/**displays number of direct children slotted into parent */
private directChildren;

private parent;

private containedChildren !: HTMLElement
private checkbox !: HTMLCbpCheckboxElement

@Listen('stateChanged')
  handleCheck(e){
    e.stopPropagation();

    let checkbox = e.target;

    this.treeviewItemChecked = checkbox.checked;
    this.host.setAttribute('aria-selected', checkbox.checked)
    
  if(this.containedChildren && this.containedChildren.querySelectorAll('cbp-treeview-item')) {
    let childTreeviewItem = this.containedChildren.querySelectorAll('cbp-treeview-item') as unknown as HTMLCbpTreeviewItemElement[];
    childTreeviewItem.forEach(a => {
      let childCheckbox = a.querySelector('cbp-checkbox')
      checkbox.indeterminate = false;

      if(checkbox.checked == true){
        a.treeviewItemChecked = true;
        childCheckbox.checked = true;
      }else{
        a.treeviewItemChecked = false;
        childCheckbox.checked = false;
      }
    })
  }

    this.treeviewItemUpdate.emit({
      host: this.host,
      parent: this.parent,
      checked: checkbox
    })
  }
    
  @Listen('treeviewItemUpdate')
    handleTreeviewItemUpdate(e){
      if(this.host == e.detail.parent){

      let selectedChildren = 0;
      let allSelectedChildren = 0;
      let indeterimateChild = false;

      for (let i = 0; i < this.children.length; i++){
        if(this.children[i].treeviewItemChecked){ 
        selectedChildren= selectedChildren + 1;
        }else if(this.children[i].treeviewItemIndeterminate){
          indeterimateChild = true;
        }
      }

      for(let i = 0; i < this.allChildren.length; i++){
        if(this.allChildren[i].treeviewItemChecked){
          allSelectedChildren = allSelectedChildren + 1;
        }
      }

    if(this.children.length == selectedChildren && this.allChildren.length == allSelectedChildren){
      this.checkbox.checked = true;
      this.host.treeviewItemChecked = true
      this.checkbox.indeterminate = false;
      this.host.treeviewItemIndeterminate = false;
    }else if(this.children.length > selectedChildren && selectedChildren != 0 && this.allChildren.length > allSelectedChildren || indeterimateChild){
      this.checkbox.checked = false;
      this.host.treeviewItemChecked = false;
      this.checkbox.indeterminate = true;
      this.host.treeviewItemIndeterminate = true;
    }else{
      this.checkbox.checked = false;
      this.host.treeviewItemChecked = false;
      this.checkbox.indeterminate = false;
      this.host.treeviewItemIndeterminate = false;
    }

    if(e.detail.parent.tagName == 'CBP-TREEVIEW-ITEM'){
      
      this.treeviewItemUpdate.emit({
        host: this.host,
        parent: this.parent,
        checked: this.host.querySelector('cbp-checkbox')
      })
    }
  }
  }

  toggleOpen(){
    this.open === false ? this.open = true : this.open = false;
  }

componentDidLoad(){
if(this.containedChildren){
    let childNodes = this.containedChildren.children;
    this.children = Array.from(childNodes).filter(element => {
      return element.tagName === 'CBP-TREEVIEW-ITEM';
    }) as HTMLCbpTreeviewItemElement[];

    this.allChildren = this.containedChildren.querySelectorAll('cbp-treeview-item') as unknown as HTMLCbpTreeviewItemElement[];

  }
  
  //TODO: fire handleCheck event to 'init' the state of the treeview
  if(this.treeviewItemChecked){
    let initCheckbox = this.checkbox.firstElementChild.firstElementChild as HTMLInputElement;
    initCheckbox.click(); //TODO: Is firing multipe times up the parental chain but not seeing the visual change
    console.log('initCheckbox: ', this.host, initCheckbox)
  }
}

  componentWillLoad(){
    let node = this.host.parentNode as HTMLElement;
    this.parent = node.closest("cbp-treeview-item") 

    if(this.host.lastElementChild != null){
      this.directChildren = this.host.children.length
    }
  }

  render() {
  
    return (
      <Host
        role="treeitem"
        id={this.uid}
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
            <cbp-checkbox ref={(el) => this.checkbox = el as HTMLCbpCheckboxElement}>
              <input type="checkbox" name="checkbox" />
               
              {this.directChildren ? this.label + ' (' + this.directChildren + ')' : this.label}
              
              {/** below is changing # on expand of the control, seems to be reducing by 1 but need to confirm reason
              {this.host.children.length > 0 ? this.label + ' (' + this.host.children.length + ')' : this.label}
              */}  
              </cbp-checkbox>
          }
        </span>
          <div 
            class="cbp-treeview-content" 
            ref={(el) => this.containedChildren = el as HTMLElement}
            role='group'  
          >
            <slot></slot>
          </div>
      </Host>
    );
  }

}
